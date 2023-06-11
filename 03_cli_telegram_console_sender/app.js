const TelegramBot = require('node-telegram-bot-api');
const { program } = require('commander');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

program.version('0.0.1');

program
    .command('send-message')
    .description('Send message to Telegram Bot')
    .alias('m')
    .arguments('<message>')
    .action((message) => {
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;

            bot.sendMessage(chatId, message).then(() => {
                process.exit(0);
            });
        });
    });

program
    .command('send-photo')
    .description('Send photo to Telegram Bot. Just drag and drop it to console after p-flag.')
    .alias('p')
    .arguments('<path>')
    .action((path) => {
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;

            bot.sendPhoto(chatId, path, {}, { contentType: "image/jpeg" }).then(() => {
                process.exit(0);
            });
        });
    });

program.parse(process.argv);
