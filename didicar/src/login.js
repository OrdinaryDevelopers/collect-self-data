const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

/**
 * 接受用户输入
 */
const get_line = (function () {
    const getLineGen = (async function* () {
        for await (const line of rl) {
            yield line;
        }
    })();
    return async () => ((await getLineGen.next()).value);
})();

(async () => {
    const browser = await puppeteer.launch({headless: false});
    try {
        const page = await browser.newPage();

        page.on('request', request => {
            if (request.url().includes('passenger/history')) {
                let cookies = request.cookies();
                console.log(cookies);

                let cookies_string = '';
                cookies.forEach(e => {
                    cookies_string += `${e.name}=${e.value};`;
                });

                fs.writeFile('cookies.txt', cookies_string, e => e);
            }
        });

        await page.goto('https://common.diditaxi.com.cn/general/webEntry?h=1#/', {waitUntil: 'networkidle2'});

        /**
         * 隐藏提示框
         */
        await hide_dialog(page);

        (await page.waitForSelector('#app > div.navigator > div > div.avatar-wrapper')).click();
        await page.waitFor('body > div.login-wrapper.add-trans.show > div > div > div.input-wrapper > input');
        await page.focus('body > div.login-wrapper.add-trans.show > div > div > div.input-wrapper > input');

        await input_phone(page);
        await input_captcha(page);
        await input_sms_code(page);

        await page.waitForFrameNavigation();
    } catch (e) {
        console.log('error: ', e);
    } finally {
        await browser.close();
    }
})();

/**
 * 休眠毫秒
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 通过文案判断是否跳转页面(未跳转说明当前步骤异常)
 */
async function flag_includes(page, includes) {
    let success_flag = await page.$('body > div.login-wrapper.add-trans.show > div > div > div.title');
    let title = await page.evaluate(e => e.innerText, success_flag);
    return title.includes(includes);
}

/**
 * 输入手机号码
 */
async function input_phone(page) {
    console.log('手机号码:');

    await page.keyboard.type(await get_line(), {delay: 100});
    (await page.waitForSelector('body > div.login-wrapper.add-trans.show > div > div > div.option > div > div')).click();
    (await page.waitForSelector('body > div.login-wrapper.add-trans.show > div > div > div.ensure-button.active')).click();

    await sleep(1000);

    if (await flag_includes(page, '输入手机号')) {
        throw new Error('操作频次过高,请稍后再试');
    }
}

/**
 * 输入图形验证码
 */
async function input_captcha(page) {
    await show_captcha_img(page);

    console.log('图形验证码:');
    let captcha = await get_line();
    (await page.waitForSelector('body > div.login-wrapper.add-trans.show > div > div > div.code-inner > div:nth-child(1)')).click();
    await sleep(100);
    for (let i = 0; i < captcha.length; i++) {
        await page.keyboard.type(captcha[i], {delay: 100});
    }

    await sleep(1000);

    if (await flag_includes(page, '图形')) {
        await input_captcha(page);
    }
}

/**
 * 输入短信验证码
 */
async function input_sms_code(page) {
    console.log('短信验证码:');
    let sms_code = await get_line();
    (await page.waitForSelector('body > div.login-wrapper.add-trans.show > div > div > div.code-inner > div:nth-child(1)')).click();
    await sleep(100);
    for (let i = 0; i < sms_code.length; i++) {
        await page.keyboard.type(sms_code[i], {delay: 100});
    }

    await sleep(1000);

    if (await flag_includes(page, '验证码')) {
        await input_sms_code(page);
    }
}

/**
 * 隐藏烦人的提示框
 */
async function hide_dialog(page) {
    await page.waitFor('#app > div.mf-layer > div > div > div > div.mf-dialog-btns.border-right-1px > a.border-top-1px.mf-dialog-btn-active');
    await page.evaluate(() => {
        /**
         * 日志在控制台看
         */
        document.querySelector("#app > div.mf-layer").setAttribute('style', 'display: none')
        console.log('hide dialog');
    })
}

/**
 * 保存并打开图形验证码(windows)
 */
async function show_captcha_img(page) {
    let image_base64_string = await page.evaluate((e) => e.getAttribute('src'), (await page.waitForSelector('body > div.login-wrapper.add-trans.show > div > div > div.captcha-wrapper > img')));
    let base64_data = image_base64_string.replace(/^data:image\/\w+;base64,/, "");
    let data_buffer = Buffer.from(base64_data, 'base64');

    const captcha_ima_path = '../temp';
    if (!fs.existsSync(captcha_ima_path)) {
        fs.mkdirSync(captcha_ima_path);
    }

    fs.writeFile(`${captcha_ima_path}/captcha_img.png`, data_buffer, e => e);
    exec(path.resolve(`${captcha_ima_path}/captcha_img.png`));
}
