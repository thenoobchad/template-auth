"use server";

import argon2 from "argon2";
import * as v from "valibot";
import { SigninSchema } from "@/validators/signin-validator";

type Res = { success: true };

export async function signinUserAction(values: unknown): Promise<Res> {
	
	return { success: true};
}
