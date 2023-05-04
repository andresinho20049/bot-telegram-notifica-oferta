import { NextApiRequest, NextApiResponse } from "next";
import { Update } from "node-telegram-bot-api";

const handlerBotWebHook = async (request: NextApiRequest, response: NextApiResponse) => {

    const update:Update = request.body;
    console.log(`#### Start Request #####`);
    console.log(`Update: ${update.update_id}`);
    console.log(JSON.stringify(update));
    console.log(`### Finish Request #####`);

    response.status(200).json({message: 'OK'});
}

export default handlerBotWebHook;