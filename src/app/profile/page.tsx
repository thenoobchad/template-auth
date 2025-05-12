
import { Button } from "@/components/ui/button";
import { SignoutButton } from "@/components/signout-button";
import { User } from "next-auth";
import Link from "next/link";
import { findUserById } from "@/resources/user-queries";
import { UpdateUserInfoForm } from "./_components/update-user-info-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function ProfilePage() {
  const session = await auth();

  // if(!session) redirect("/auth/signin");

  //Acces user from databse
  //   const sessionUserId = session?.user?.id;
  // let databaseUser;
  // if (sessionUserId) {
  //   databaseUser = await findUserById(sessionUserId);

  // }

  return (
    <main className="mt-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <div className="bg-muted my-4 h-1" />

        {/* .... */}
        {!!session?.user ? <SignedIn user={session.user} /> : <SignedOut />}
      </div>
    </main>
  );
}

const SignedIn = ({ user }: { user: User }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">User Information</h2>
        <UpdateUserInfoForm user={user} />
      </div>

      <table className="mt-4 table-auto divide-y">
        <thead>
          <tr className="divide-x">
            <th className="bg-gray-50 px-6 py-3 text-start">id</th>
            <th className="bg-gray-50 px-6 py-3 text-start">name</th>
            <th className="bg-gray-50 px-6 py-3 text-start">email</th>
            <th className="bg-gray-50 px-6 py-3 text-start">role</th>
          </tr>
        </thead>
        <tbody>
          <tr className="divide-x">
            <td className="bg-gray-50 px-6 py-3 text-start">{user.id}</td>
            <td className="bg-gray-50 px-6 py-3 text-start">
              {user.name || "NULL"}
            </td>
            <td className="bg-gray-50 px-6 py-3 text-start">{user.email}</td>
            <td className="bg-gray-50 px-6 py-3 text-start uppercase">
              {user.role}
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
