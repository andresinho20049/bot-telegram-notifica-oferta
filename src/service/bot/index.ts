import TelegramBot from "node-telegram-bot-api";

const token: string = process.env.TOKEN_BOT || "Token not found!";
const bot = new TelegramBot(token, {polling: true});

export default bot;