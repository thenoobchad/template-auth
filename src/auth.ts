import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import * as v from "valibot";
import argon2 from "argon2";
import { SigninSchema } from "@/validators/signin-validator";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { findUserByEmail } from "@/resources/user-queries";
import { db } from "@/server/db";
import * as schema from "@/server/schema";
import { TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST } from "next/dist/shared/lib/constants";
import { oauthVerifyEmailAction } from "./actions/oauth-verify-email-action";

const nextAuth = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    authenticatorsTable: schema.authenticators,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {
    jwt({ token, user }) {
      console.log(user);
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },

  events: {
   async linkAccount({user, account}){
    if(["google", "github"].includes(account.provider)) {
      //verify user email
      if(user.email) await oauthVerifyEmailAction(user.email)
    }
   }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = v.safeParse(SigninSchema, credentials);

        if (parsedCredentials.success) {
          //carry on mate
          const { email, password } = parsedCredentials.output;

          //Look for user in database
          const user = await findUserByEmail(email);

          if (!user) return null;
          if (!user.password) return null;

          const passwordsMatch = await argon2.verify(user.password, password);
          if (passwordsMatch) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

export const { signIn, auth, signOut, handlers } = nextAuth;
