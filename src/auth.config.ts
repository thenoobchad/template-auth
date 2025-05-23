import { NextAuthConfig } from "next-auth";

import { db } from "@/server/db";
import * as schema from "@/server/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { oauthVerifyEmailAction } from "@/actions/oauth-verify-email-action";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { USER_ROLES } from "./lib/constants";
import { changeUserRoleAction } from "@/actions/change-user-role-action";
import type { AdapterUser } from "@auth/core/adapters";
import { getTableColumns } from "drizzle-orm";
import { Awaitable } from "@auth/core/types";

export const authConfig = {
  adapter: {
    ...DrizzleAdapter(db, {
      usersTable: schema.users,
      accountsTable: schema.accounts,
      authenticatorsTable: schema.authenticators,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
    }),
    async createUser(data: AdapterUser) {
      const { id, ...insertData } = data;
      const hasDefaultId = getTableColumns(schema.users)["id"]["hasDefault"];
      const isAdmin =
        process.env.ADMIN_EMAIL_ADDRESS?.toLowerCase() ===
        insertData.email.toLowerCase();
      if (isAdmin) insertData.role = USER_ROLES.ADMIN;

      return db
        .insert(schema.users)
        .values(hasDefaultId ? insertData : { ...insertData, id })
        .returning()
        .then((res) => res[0]) as Awaitable<AdapterUser>;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;

      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");

      if (isOnProfile) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/auth/signin", nextUrl));
      }

      if (isOnAuth) {
        if (!isLoggedIn) return true;
        return Response.redirect(new URL("/profile", nextUrl));
      }
      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;

      // if (
      //   user?.email &&
      //   process.env.ADMIN_EMAIL_ADDRESS?.toLowerCase() ===
      //     user.email.toLowerCase()
      // ) {
      //   token.role = USER_ROLES.ADMIN;
      // }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return !!profile?.email_verified;
      }

      if (account?.provider === "github") {
        return true;
      }

      if (account?.provider === "credentials") {
        if (user.emailVerified) {
          //return true
        }
        return true;
      }
      return false;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (["google", "github"].includes(account.provider)) {
        //verify user email
        if (user.email) await oauthVerifyEmailAction(user.email);
      }
    },
    // async createUser({ user }) {
    //   if (
    //     user.email &&
    //     process.env.ADMIN_EMAIL_ADDRESS?.toLowerCase() ===
    //       user.email.toLowerCase()
    //   ) {
    //     await changeUserRoleAction(user.email, USER_ROLES.ADMIN);
    //   }
    // },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;
