import { NextApiRequest, NextApiResponse } from "next";

const helloWorld = (request: NextApiRequest, response: NextApiResponse) => {
    return response.json({
        sucess: true,
        message: 'Hello World'
    });
}

export default helloWorld;