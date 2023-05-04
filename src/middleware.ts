import { NextRequest } from "next/server";
import { authenticatedMiddleware } from "./middlewares/ApiMiddleware";
import { privatedRouteMiddleware } from "./middlewares/PrivateRouteMiddleware";


export const config = {
  matcher: ['/api/private/:path*', '/admin/:path*']
}

const middleware = async (request: NextRequest) => {

  if (request.nextUrl.pathname.startsWith('/api')) {
    return authenticatedMiddleware(request);
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    return privatedRouteMiddleware(request);
  }
};

export default middleware;