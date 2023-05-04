import { NextRequest, NextResponse } from "next/server";
import { handlerVerify } from "@/service/security/useJwt";

const redirectError = (request: NextRequest) => {
    request.cookies.delete('token-jwt');

    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('token-jwt');

    return response;
}

const privatedRouteMiddleware = async (request: NextRequest) => {
    const token = request.cookies.get('token-jwt')?.value;

    if(!token) 
        return redirectError(request);

    const decoded = await handlerVerify(token);

    if (!decoded) 
        return redirectError(request);

    return NextResponse.next();
};

export {
    privatedRouteMiddleware
};
