const TelegramBot = require('node-telegram-bot-api');
const NodeCache = require("node-cache");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const myCache = new NodeCache({stdTTL: 60});

const cacheMonoRes = async () => {
    const monoResponse = await fetch('https://api.monobank.ua/bank/currency');
    const mono = await monoResponse.json();
    const monoUSD = mono.find(curr => curr.currencyCodeA === 840);
    const monoEUR = mono.find(curr => curr.currencyCodeA === 978);
    myCache.set('monoUSD', monoUSD);
    myCache.set('monoEUR', monoEUR);
};

const getPrivatRes = async (currency) => {
    const privatResponse = await fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11');
    const privat = await privatResponse.json();

    return privat.find(curr => curr.ccy === currency);
};

const getResultStr = (currency, privatCurr) => {
    let resultStr = `Privat\n${currency}: buy ${privatCurr.buy}, sell ${privatCurr.sale}`;
    resultStr += `\nMono\n${currency}: buy ${myCache.get(`mono${currency}`).rateBuy}, sell ${myCache.get(`mono${currency}`).rateSell}`;

    return resultStr;
};

const botSendMessage = async (msg, currency) => {
    const privatCurr = await getPrivatRes(currency);

    const resultStr = getResultStr(currency, privatCurr);

    await bot.sendMessage(msg.chat.id, resultStr);
};

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Choose a Currency', {
        "reply_markup": {
            "keyboard": [['USD', 'EUR']]
        },
    });
});

bot.onText(/USD/, async (msg) => {
    try {
        await cacheMonoRes();

        await botSendMessage(msg, 'USD');
    } catch {
        await botSendMessage(msg, 'USD');
    }
});

bot.onText(/EUR/, async (msg) => {
    try {
        await cacheMonoRes();

        await botSendMessage(msg, 'EUR');
    } catch {
        await botSendMessage(msg, 'EUR');
    }
});
