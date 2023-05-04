import { NextApiRequest, NextApiResponse } from "next";

const handlerBotWebHook = async (request: NextApiRequest, response: NextApiResponse) => {

    console.log(request.body);

    response.status(200).json({message: 'OK'});
}

export default handlerBotWebHook;