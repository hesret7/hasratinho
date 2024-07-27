import { NextResponse } from 'next/server';
import { getProfileFromMiddle } from '@/api/auth';

export async function middleware(request) {
  const AccessToken = request.cookies.get('jwtToken')?.value;

  const response = NextResponse.next();

  let isAuth = true;

  if (AccessToken === undefined) {
    isAuth = false;
  } else {
    const resp = await getProfileFromMiddle(AccessToken);
    if (resp.isAuth === false) {
      response.cookies.delete('jwtToken');
      isAuth = false;
    }
  }

  if (isAuth) {
    if (request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (request.nextUrl.pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (!(request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/login', '/register'],
};
