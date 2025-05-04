import { SignupForm } from "./_components/signup-form";

export default function SignupPage() {
	return (
		<main className="mt-4">
			<div className="container mx-auto">
				<h1 className="text-3xl font-bold tracking-tight">Sign up</h1>
				<div className="h-1 bg-muted my-4">
					{/* Sign up form */}
					<SignupForm />
					{/* OAuth links */}

					{/* Go to Signup links */}
				</div>
			</div>
		</main>
	);
}
