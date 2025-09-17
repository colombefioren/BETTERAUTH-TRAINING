import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { validator } from "validation-better-auth";
import { loginSchema, registerSchema } from "./validations/auth";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  appName: "BetterAuth Todo",
  plugins: [
    validator([
      {
        path: "/sign-up/email",
        schema: registerSchema,
      },
      { path: "/sign-in/email", schema: loginSchema },
    ]),
  ],
});
