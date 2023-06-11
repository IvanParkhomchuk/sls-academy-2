const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const city = 'Zhytomyr';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_KEY}`;

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Choose your city", {
        "reply_markup": {
            "keyboard": [[`Forecast in ${city}`]]
        },
        one_time_keyboard: true
    });
});

bot.onText(new RegExp(city), (msg) => {
    bot.sendMessage(msg.chat.id, "Choose weather forecast interval", {
        "reply_markup": {
            "keyboard": [['at intervals of 3 hours'], ['at intervals of 6 hours']]
        },
        one_time_keyboard: true
    });
});

bot.onText(/[36]/, (msg) => {
    let resStr = '';

    axios.get(url)
        .then((res) => {
            const data = res.data.list;
            let prevVal = null;

            resStr += `Weather in ${city}:\n`;

            data.forEach((elem, ind) => {
                const date = new Date(elem.dt * 1000);

                const options = {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                };

                if (elem.dt_txt.split(' ')[0] !== prevVal) {
                    resStr += '\n\n' + date.toLocaleDateString('en-US', options);
                    prevVal = elem.dt_txt.split(' ')[0];
                }

                if (msg.text.match(/3/) || (msg.text.match(/6/) && ind % 2 === 0)) {
                    resStr += `\nTemperature: ${elem.main.temp}, Feels like: ${elem.main.feels_like}, ${elem.weather[0].description}, ${date.getHours()}:00`;
                }
            });

            bot.sendMessage(msg.chat.id, resStr);
        })
        .catch((err) => {
            console.log(err);
            bot.sendMessage(msg.chat.id, 'Something go wrong :(');
        });
});
