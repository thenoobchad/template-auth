import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { SignoutButton } from "@/components/ui/signout-button";
import { User } from "next-auth";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  console.log(session);
  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <div className="bg-muted my-4 h-1" />

        {/* .... */}
        {!!session?.user ? <SignedIn user={session.user}/> : <SignedOut />} 
      </div>
    </main>
  );
}

const SignedIn = ({user}: {user: User}) => {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">User Information</h2>

      <table className="mt-4 table-auto divide-y">
        <thead>
          <tr className="divide-x">
            <th className="bg-gray-50 px-6 py-3 text-start">name</th>
            <th className="bg-gray-50 px-6 py-3 text-start">email</th>
          </tr>
        </thead>
        <tbody>
          <tr className="divide-x">
            <td className="bg-gray-50 px-6 py-3 text-start">
              {user.name || "NULL"}
            </td>
            <td className="bg-gray-50 px-6 py-3 text-start">
              {user.email || "NULL"}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bg-muted my-2 h-1" />
      {/* Sign out button */}
      <SignoutButton />
    </>
  );
};

const SignedOut = () => {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">User Not Signed In</h2>
      <div className="bg-muted my-2 h-1" />
      <Button asChild>
        <Link href="/auth/signin">Sign In</Link>
      </Button>
    </>
  );
};
