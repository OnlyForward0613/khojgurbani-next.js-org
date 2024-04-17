import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
    '/commentary',
    '/glossary',
    '/media',
    '/gubanisearch',
];
const unprotectedRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgotpassword',
];

import { auth } from '@/auth';

export default async function middlewareHandler(request: NextRequest) {
    const session = await auth();

    const isProtectedRoute = protectedRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (!session && isProtectedRoute) {
        return NextResponse.redirect(`${request.nextUrl.origin}/auth/login`);
    }

    if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(`${request.nextUrl.origin}/home`);
    }
}
