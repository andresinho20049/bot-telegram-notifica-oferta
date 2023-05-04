import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_KEY_SIGNATURE);
const algorithm = 'HS256';

export const handlerSigning = async (username: string):Promise<string> => {

    const payload: jose.JWTPayload = {
        sub: username
    };
    
    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({alg: algorithm})
        .setExpirationTime('4h')
        .setIssuedAt()
        .sign(secret);

    return jwt;

};

export const handlerVerify = async (token: string): Promise<jose.JWTPayload | null> => {
    try {
        const { payload } = await jose.jwtVerify(token, secret);
        return payload;
    } catch(err) {
        console.error(err);
        return null;
    }
}