import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { validator } from "validation-better-auth";
import { emailLoginSchema, registerSchema } from "./validations/auth";
import { username } from "better-auth/plugins";
import { sendEmailAction } from "@/actions/send-email.action";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please click the link below to verify your email address.",
          link: url.toString(),
        },
      });
    },
  },
  appName: "BetterAuth Todo",
  plugins: [
    validator([
      {
        path: "/sign-up/email",
        schema: registerSchema,
      },
      { path: "/sign-in/email", schema: emailLoginSchema },
    ]),
    username(),
  ],
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
});
