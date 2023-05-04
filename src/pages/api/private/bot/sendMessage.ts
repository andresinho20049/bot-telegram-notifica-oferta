import { ISendMessageProps, sendMessageService } from "@/service/bot/api/SendMessage";
import { NextApiRequest, NextApiResponse } from "next";

const sendMessageApi = async (request: NextApiRequest, response: NextApiResponse) => {
    
    const body:ISendMessageProps = request.body;
    const {status, data } = await sendMessageService(body);

    response.status(status).json(data);
}

export default sendMessageApi;