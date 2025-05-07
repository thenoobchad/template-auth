"use server";


import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function signinUserAction(values: unknown): Promise<Res> {
  try {
    if (
      typeof values !== "object" ||
      values === null ||
      Array.isArray(values)
    ) {
      throw new Error("Invalid JSON Object");
    }

    await signIn("credentials", { ...values, redirect: false });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.name) {
        case "CredentialsSignin":
        case "CallbackRouterError":
          return {
            success: false,
            error: "Invalid credentials",
            statusCode: 401,
          };
        default:
          return {
            success: false,
            error: "Oops. Something went wrong",
            statusCode: 500,
          };
      }
    }
    console.log(error);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
