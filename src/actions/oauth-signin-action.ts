"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function oauthSigninAction(provider: "google" | "github") {
  try {
    console.log("oauthSigninAction", provider);
    await signIn(provider, { redirectTo: "/profile" });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error(error);
  }
}
