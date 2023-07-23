import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
// import Cookies from 'js-cookie';

export async function middleware(request) {
  const jwt = request.cookies.get('signIn');
  console.log(jwt);
  let rol = null;
  if (jwt !== undefined) {
    const { payload } = await jwtVerify(jwt.value, new TextEncoder().encode(process.env.secretKey));
    rol = payload.rol;
  } else {
    rol = null;
  }

  if (!jwt) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const paths = ['monitor', 'user', 'admin'];
  // admin limits
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (rol === paths[1]) {
      return NextResponse.redirect(new URL('/user', request.url));
    }
    if (rol === paths[0]) {
      return NextResponse.redirect(new URL('/monitor', request.url));
    }
    return NextResponse.next();
  }
  // user limits
  if (request.nextUrl.pathname.startsWith('/user')) {
    if (rol === paths[0]) {
      return NextResponse.redirect(new URL('/monitor', request.url));
    }
    if (rol === paths[2]) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }
  // monitor limits
  if (request.nextUrl.pathname.startsWith('/monitor')) {
    if (rol === paths[1]) {
      return NextResponse.redirect(new URL('/user', request.url));
    }
    if (rol === paths[2]) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // redirects for user logged
  if (request.nextUrl.pathname.startsWith(`/${rol}`)) {
    try {
      const { payload } = await jwtVerify(jwt.value, new TextEncoder().encode(process.env.secretKey));
      console.log({ payload });
      return NextResponse.next();
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/user/:path*', '/admin:path*', '/monitor/:path*'],
};
