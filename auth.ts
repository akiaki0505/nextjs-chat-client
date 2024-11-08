import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/route";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHub from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const config: NextAuthConfig = {
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
      },
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID, 
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                mailaddress: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { mailaddress: credentials.mailaddress as string },
                });
                
                if (user) {
                    const isValidPassword = bcrypt.compareSync(credentials.password as string, user.password);
                if (isValidPassword) {
                    return { id: user.id, mailaddress: user.mailaddress, name: user.name };
                }
            }
            return null;
            }
        }),
    ],
    trustHost: true,
    //basePath: "/api/auth",
    callbacks: {
        authorized({ request, auth }){
            try{
                /*const { pathname } = request.nextUrl;
                if (pathname === "/protected-page") return !!auth;
                return true;*/
                const { nextUrl } = request;
                const isLoggedIn = !!auth;
                const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
                const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
                const isAuthRoute = authRoutes.includes(nextUrl.pathname);
                if (isApiAuthRoute) {
                    // /api/auth は未認証でもアクセス可能
                    return true;
                }
                if (isAuthRoute) {
                    if (isLoggedIn) {
                        // すでにログイン済みの場合は、リダイレクトさせる
                        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
                    }

                    // 未ログインで認証ページの場合は、アクセス可能
                    return true;
                }
                
                return !(!isLoggedIn && !isPublicRoute);
                
            }catch(err) {
                console.log(err);
            }
        },
        jwt({ token, trigger, session }){
            if(trigger === "update") token.name = session.user.name;
            return token;
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);