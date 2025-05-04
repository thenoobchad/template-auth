import { SigninForm } from "./_components/signin-form";

export default function SigninPage() {
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
        <div className="bg-muted my-4 h-1">
          {/* Sign in form */}
          <SigninForm />
          {/* OAuth links */}

          {/* Go to Signin links */}
        </div>
      </div>
    </main>
  );
}
