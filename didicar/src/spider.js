const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
var fs = require('fs');

const cookies = fs.readFileSync('cookies.txt');
if (!cookies) {
    throw new Error('Cookie 不存在');
}

/**
 * 存储数据
 */
let pages = [];
let orders = [];

(async () => {
    const browser = await puppeteer.launch({headless: false});
    try {
        const page = await browser.newPage();
        // await page.emulate(devices['Galaxy S5']); // 使用设备无法触发单击事件。

        page.on('response', response => {
            // console.log(response.url());
            if (response.url().includes('passenger/history')) {
                response.text().then(body => {
                    pages.push(JSON.parse(body));
                    console.log('new list data');
                })
            } else if (response.url().includes('passenger/v2/core/pOrderDetail')) {
                response.text().then(body => {
                    orders.push(JSON.parse(body));
                    console.log('new detailed data');
                })
            }
        });

        await handle_cookie(page);
        await hide_dialog(page);
        await click_orders(0, page);
    } catch (e) {
        console.log(e)
    } finally {
        await browser.close();
        await save_data();
    }
})();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 从 String 提取 Cookie
 */
function extracted_cookies(domain, string) {
    let cookies = [];
    string.split(';').forEach(e => {
        let key = e.substring(0, e.indexOf('=')).trim();
        let val = e.substring(e.indexOf('=') + 1).trim();
        cookies.push({
            domain: domain,
            name: key,
            value: val
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
    let cookies = extracted_cookies('common.diditaxi.com.cn', cookies);
    let ticket = cookies.filter(e => e.name === 'ticket')[0].value;
    await page.setCookie(...cookies);

    let login_status_domain = 'https://epassport.diditaxi.com.cn/passport/static/1.0.4/passport_blank.html?env=online';
    await page.goto(login_status_domain);

    // 登录态
    await page.evaluate((val) => {
        console.log(window.localStorage.setItem('ticket', val));
    }, ticket);
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
    const result_path = '../result';
    if (!fs.existsSync(result_path)) {
        fs.mkdirSync(result_path);
    }

    let pset = new Set();
    await fs.writeFile(`${result_path}/list.json`, JSON.stringify(pages.filter(e => !pset.has(e.timemode) && pset.add(e.timemode))), 'utf8', (err) => {
        if (err) throw err;
        console.log('done');
    });

    let oset = new Set();
    await fs.writeFile(`${result_path}/detailed.json`, JSON.stringify(orders.filter(e => !oset.has(e.data.basic_data.order_info.order_id) && oset.add(e.data.basic_data.order_info.order_id))), 'utf8', (err) => {
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
