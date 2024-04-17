import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        resData: any
    }
    interface JWT {
        provider: string,
        social_account_id: string
    }
}