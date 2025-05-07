import { Button } from "@/components/ui/button";
import { SignupForm } from "./_components/signup-form";
import Link from "next/link";
import OAuthSigninButtons from "@/components/oauth-signin-buttons";

export default function SignupPage() {
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Sign up</h1>
        {/* Sign up form */}
        <div className="bg-muted my-4 h-1" />
        <SignupForm />
        {/* OAuth links */}
        <div className="bg-muted my-4 h-1" />
        <OAuthSigninButtons signup />

        {/* Go to Signup links */}
        <div className="bg-muted my-4 h-1" />
        <p>
          Already have an account? Click{" "}
          <Button variant="link" size="sm" className="px-0 text-[16px]" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>{" "}
          to sign in.
        </p>
      </div>
    </main>
  );
}
