import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma";
import { nextCookies } from "better-auth/next-js";
import sendMail from "../email";
// If your Prisma file is located elsewhere, you can change the path

 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
    emailAndPassword: {  
        enabled: true,
        minPasswordLength:8,
        maxPasswordLength:40,
        autoSignIn:true,
        sendResetPassword:async ({user,url})=>{
            await sendMail({
                to:user.email,
                subject:"Reset your password",
                text:`Click the link to reset your password : ${url}`
            })
        },
        resetPasswordTokenExpiresIn:3600
    },
    account:{
        accountLinking:{
            enabled:true
        }
    },
    socialProviders: { 
        github: { 
           clientId: process.env.GITHUB_CLIENT_ID as string, 
           clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
        google: { 
           clientId: process.env.GOOGLE_CLIENT_ID as string, 
           clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },  
    },
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
    plugins: [nextCookies()] 
});