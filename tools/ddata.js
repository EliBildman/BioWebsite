const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const Xvfb =  require('xvfb');

module.exports.getHistory = async function(username, password, callback) {

    //idrk why this has to be here
    let x = new Xvfb();

    let nm = Nightmare();
    nm.goto('https://get.cbord.com/umass/full/login.php')
    // .end()
    // .then(console.log);
    .type('#netid_text', username)
    .type('#password_text', password)
    .click('#login_submit')
    .wait('a.tabletop_left, p.form-element.form-error')
    // .wait()
    .exists('a.tabletop_left')
    .then((result) => {
        if(result) {
            nm.click('a.tabletop_left')
            .evaluate(() => document.querySelector('#historyTable').innerHTML)
            .end()
            .then((re) => callback(parse(re)))
            .catch(console.log);
        } else {
            nm.end()
            .then(() => {
                callback({error: "BAD LOGIN"});
            });
        }
    });
}

function parse(html) {
    let data = [];
    const $ = cheerio.load(html);
    let len = $('tbody tr').length;
    for(let i = 1; i <= len; ++i) {
        data.push({ 
            account: cheerio.text($(`tbody.scrollContent > tr:nth-child(${i}) > td.account_name`)),
            date: cheerio.text($(`tbody.scrollContent > tr:nth-child(${i}) > td.date_time > .date`)),
            time: cheerio.text($(`tbody.scrollContent > tr:nth-child(${i}) > td.date_time > .time`)),
            location: cheerio.text($(`tbody.scrollContent > tr:nth-child(${i}) > td.activity_details`)),
            spent: cheerio.text($(`tbody.scrollContent > tr:nth-child(${i}) > td.amount_points`)),
            remaining: cheerio.text($(`tbody.scrollContent > tr:nth-child(${i}) > td.last-child`))
        });
    }
    return data;
}

module.exports.getHistory('a', 'a', console.log);