import axios from "axios";

const config = {
    baseURL: `https://api.telegram.org/bot${process.env.TOKEN_BOT}`
}

export const ApiTelegram = axios.create(config);