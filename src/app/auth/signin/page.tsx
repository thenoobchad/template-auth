import { Button } from "@/components/ui/button";
import { SigninForm } from "./_components/signin-form";
import Link from "next/link";
import OAuthSigninButtons, { OAuthSigninButtonSkeleton } from "@/components/oauth-signin-buttons";
import { Suspense } from "react";

export default function SigninPage() {
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
        {/* Sign in form */}
        <div className="bg-muted my-4 h-1" />
        <SigninForm />
        {/* OAuth links */}
        <div className="bg-muted my-4 h-1" />

        <Suspense fallback={<OAuthSigninButtonSkeleton/>}>
          <OAuthSigninButtons />
        </Suspense>

        {/* Go to Signin links */}
        <div className="bg-muted my-4 h-1" />
        <p>
          Don&apos;t have an account? Click{" "}
          <Button variant="link" size="sm" className="px-0 text-[16px]" asChild>
            <Link href="/auth/signup">here</Link>
          </Button>{" "}
          to sign up.
        </p>
      </div>
    </main>
  );
}
