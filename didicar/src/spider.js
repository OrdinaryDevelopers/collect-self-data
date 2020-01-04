const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
var fs = require('fs');

const COOKIES = 'webapp_wx_client_uid=6c3551f1fa262eac3e5188b06b83f843; openid=general_app; webapphome_accesstime=1578033305764.9; _OMGID=a6e78692-ffac-46d8-83a3-448b9eb5399c; ticket=PDvaQmNiSJMwy8AAqv0mFBQoOZ9aTHidHouSgEuNaqskzDluwzAQhtG7fPVA-DlDitS06XOHLMrSMEAMV4LubtiuH_AOpkhi0SKMWchiTCdDUjVmkKW3zasPySPuXEkZs5G8vGK8kWC8kz5q33qta4nVi4zPR7iTB5e_6__HTrbT-CJL6-vw8DGMb5LSXIqmLsf4eZa_pM5bAAAA__8=; a3=7eQOmsbpHjDJGZGvWNjk2Di9X9SJ+EXAgxMwqyBvPYh7vI2j95PhZKNpbxmaKjpDhJl1KOM8Ro6S+CdzfvxUzrNWMPSb5AIx0lZpto4E0Vr9vjGYfmtUE+bDhwZ0xNuDAMU2WO2wEMDBVAkofcrspKiMf4Vqe76DSadRpnG2FcrHCRsMpqFEajAcc4QeR8ny8Ic8h6jjTi5BSczeHBz5bUomCdmUWj/Ei4IDvHAKNIVv6IIPIVXMt09aknQk7tXxqDiz5ldHMAGe0EGOOZMIugYh9au9LaumS+agIWg17dx+LN/1hpkMUXQKeKKH+Sng5zRGSutvJiyDxGjUG14eOA==';

/**
 * 存储数据
 */
let pages = [];
let orders = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 从 String 提取 Cookie
 */
function extracted_cookies(domain, string) {
    let cookies = [];
    string.split(';').forEach(e => {
        let cookie = e.split('=');
        cookies.push({
            domain: domain,
            name: cookie[0].trim(),
            value: cookie[1].trim()
        })
    });

    return cookies;
}

/**
 * 隐藏烦人的提示框
 *
 * @param page
 * @returns {Promise<void>}
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
 * 处理 cookie 登录态
 */
async function handle_cookie(page) {
    let cookies = extracted_cookies('common.diditaxi.com.cn', COOKIES);
    let ticket = cookies.filter(e => e.name === 'ticket')[0].value;
    await page.setCookie(...cookies);

    let login_status_domain = 'https://epassport.diditaxi.com.cn/passport/static/1.0.4/passport_blank.html?env=online';
    await page.goto(login_status_domain);

    // 登录态
    await page.evaluate(() => {
        console.log(window.localStorage.setItem('ticket', 'YpCn_969nuNHy7RBSlD0qCkWyuP5tmupZHo2cKr3s94kzDuqwzAQhtG9fPVgfs1Ilj3t7e8e7sN5NAokpDLeewipD5ydIZKYNAljFLIYw8mQVI0RZOlt9eqL5BFvrqSM0Ui-vjF-SDB-SV9qX3utc4nZi4x_MoyN3Hncnve_jWyHcSJL64siVnXjTFKaS9HU5RiXT3kldbwCAAD__w=='));
    });
    let target_page = 'https://common.diditaxi.com.cn/general/webEntry?h=1#/order-list';
    await page.goto(target_page, {waitUntil: 'networkidle2'});
}

/**
 * 逐个单击订单进入详情页
 */
async function click_orders(count, page) {
    let orders = await page.$$('div.order-item');

    /**
     * 防止当前页没有数据
     */
    if (!orders) {
        await next_page(page, count);
    } else {
        for (; count < orders.length; count++) {
            console.log(`click order: ${count}`)

            orders[count].click();
            await page.waitFor('.app-driver-card-content');
            await page.goBack();

            if (count === orders.length - 1) {
                await next_page(page, count);
            }
        }
    }
}

/**
 * 去重后保存数据
 */
async function save_data() {
    let pset = new Set();
    await fs.writeFile('pages.json', JSON.stringify(pages.filter(e => !pset.has(e.timemode) && pset.add(e.timemode))), 'utf8', (err) => {
        if (err) throw err;
        console.log('done');
    });

    let oset = new Set();
    await fs.writeFile('orders.json', JSON.stringify(orders.filter(e => !oset.has(e.data.basic_data.order_info.order_id) && oset.add(e.data.basic_data.order_info.order_id))), 'utf8', (err) => {
        if (err) throw err;
        console.log('done');
    });
}

/**
 * 翻页,直到最后一页(没有数据)
 */
async function next_page(page, count) {
    let next_page = await page.$('.get-more-btn');
    let text = await page.evaluate(e => e.innerText, next_page)

    if (text.includes('没有')) {
        console.log('orders extracted complete...')
    } else {
        console.log(text);
        next_page.click();

        await sleep(1000);
        await click_orders(count, page);
    }
}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    try {
        const page = await browser.newPage();
        // await page.emulate(devices['Galaxy S5']); // 使用设备无法触发单击事件。

        page.on('response', response => {
            // console.log(response._url);
            if (response._url.includes('passenger/history')) {
                response.text().then(body => {
                    pages.push(JSON.parse(body));
                    console.log('new list data');
                })
            } else if (response._url.includes('passenger/v2/core/pOrderDetail')) {
                response.text().then(body => {
                    orders.push(JSON.parse(body));
                    console.log('new detailed data');
                })
            }
        });

        /**
         * 伪装登录态
         */
        await handle_cookie(page);

        /**
         * 隐藏提示框
         */
        await hide_dialog(page);

        /**
         * 自动进入订单详情页 & 翻页
         */
        await click_orders(0, page);
    } catch (e) {
        console.log(e)
    } finally {
        await browser.close();
        await save_data();
    }
})();
