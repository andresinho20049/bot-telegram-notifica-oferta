import { NextApiRequest, NextApiResponse } from "next";
import { handlerSigning } from '@/service/security/useJwt';

const SETTINGS_CODE = process.env.SETTINGS_CODE;
const USERNAME_ADMIN_BOT = process.env.USERNAME_ADMIN_BOT;

export interface IAuthLogin {
    username: string;
    access_code: string;
}

export const callLogin = async ({username, access_code}:IAuthLogin):Promise<string> => {
    
    if (!access_code || !username)
        throw new Error('username and access_code is required');

    if(access_code !== SETTINGS_CODE || username !== USERNAME_ADMIN_BOT)
        throw new Error('Not authorized');

    return await handlerSigning(username);
    
}

const handlerLogin = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { method } = req;
    
        if (method !== 'POST')
            throw new Error('Method not allowed');
    
        const access_token = await callLogin(req.body);

        res.status(200).json({
            success: true,
            access_token: access_token
        })

    } catch (err: any) {
        console.error(err);
        res.status(400).json({message: err?.message || 'Error occurred'});
    }

}

export default handlerLogin;