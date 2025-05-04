"use server";

import argon2 from "argon2";
import * as v from "valibot";
import { SignupSchema } from "@/validators/signup-validator";

type Res =
	| { success: true }
	| { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
	| { success: false; error: string; statusCode: 500 };

export async function signupUserAction(values: unknown): Promise<Res> {
	const parsedValues = v.safeParse(SignupSchema, values);

	if (!parsedValues.success) {
		const flatErrors = v.flatten(parsedValues.issues);

		console.log(flatErrors);
		return { success: false, error: flatErrors, statusCode: 400 };
	}

	const { name, email, password } = parsedValues.output;

	try {
		//to do: hash password
		const hashedPassword = await argon2.hash(password);

		console.log({ name, email, password: hashedPassword });
		return { success: true };
	} catch (error) {
		console.error(error);
	}
	return { success: false, error: "Internal Server Error", statusCode: 500 };
}
