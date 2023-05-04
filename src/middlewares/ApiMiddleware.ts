import { handlerVerify } from "@/service/security/useJwt";
import { NextRequest, NextResponse } from "next/server";

const responseError = (request: NextRequest) => {
    return new NextResponse(
        JSON.stringify({ success: false, message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
    );
}

const authenticatedMiddleware = async (request: NextRequest) => {
    const token = request.headers.get("Authorization")?.replace('Bearer ', '');

    if (!token) 
        return responseError(request);

    const decode = await handlerVerify(token);
    if(!decode)
        return responseError(request);

    return NextResponse.next();
};

export {
    authenticatedMiddleware
};

