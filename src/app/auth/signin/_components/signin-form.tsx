"use client";

import { type SigninInput, SigninSchema } from "@/validators/signin-validator";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signinUserAction } from "@/actions/signin-user-action";

export const SigninForm = () => {
	const form = useForm<SigninInput>({
		resolver: valibotResolver(SigninSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { handleSubmit, control, formState, reset, setError } = form;

	const submit = async (values: SigninInput) => {
		const res = await signinUserAction(values)
		console.log(values);

		if(res.success) {
			reset()
		} else {
			console.log("This shouldn't be happening")
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(submit)}
				className="space-y-8 max-w-[400px]"
				autoComplete="false">
				<FormField
					control={control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="e.g. john.smith@example.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="e.g. ********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					disabled={formState.isSubmitting}
					className="w-full">
					Sign in
				</Button>
			</form>
		</Form>
	);
};
