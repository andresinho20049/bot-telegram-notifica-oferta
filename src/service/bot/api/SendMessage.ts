import TelegramBot from 'node-telegram-bot-api';
import { ApiTelegram } from './ApiConfig';

export interface ISendMessageProps extends TelegramBot.SendMessageOptions {
    chat_id: number;
    text: string;
}

export const sendMessageService = async (body: ISendMessageProps) => {

    const {status, data} = await ApiTelegram.post('/sendMessage', body);

    return {status, data};

}