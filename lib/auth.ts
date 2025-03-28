import { db } from "@/db/drizzle";
import { schema, User } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "mrigal.digitservz@gmail.com",
    pass: "kdgh jfnb vlfv ptew",
  },
});
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    requireEmailVerification: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await transporter.sendMail({
        from: '"DigitservZ"<mrigal.digitservz@gmail.com>',
        to: user.email,
        subject: "Vérifiez votre adresse e-mail",
        html: `Click the link to verify your email: <a href="${url}">${url}</a>`,
      });
    },
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: User;
      url: string;
      token?: string;
    }) => {
      await transporter.sendMail({
        to: user.email,
        subject: "Réinitialisez votre mot de passe",
        text: `Cliquez sur le lien pour réinitialiser votre mot de passe : ${url}`,
      });
    },
  },
  user: {
    additionalFields: {
      ilot: {
        type: "string",
      },
      commune: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      adresse: {
        type: "string",
      },
      username: {
        type: "string",
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 1, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    freshAge: 60 * 5, // 5 minutes (the session is fresh if created within the last 5 minutes)
    //cookieCache: {
    //  enabled: true,
    //  maxAge: 5 * 60, // Cache duration in seconds
    //},
  },
  plugins: [nextCookies(), username()],
});
