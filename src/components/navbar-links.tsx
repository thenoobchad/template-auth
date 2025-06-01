"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { SignoutButton } from "@/components/signout-button";

import { useSession } from "next-auth/react";
import { Loader2Icon } from "lucide-react";

export const NavbarLinks = () => {
  const session = useSession();

  switch (session.status) {
    case "loading":
      return <Loading />;
    case "unauthenticated":
      return <SignedOut />;
    case "authenticated":
      return <SignedIn />;
    default:
      return null;
  }
};

const Loading = () => {
  return (
    <li>
      <Button size="sm" variant="ghost">
        <Loader2Icon className="min-w-[8ch] animate-spin" />
      </Button>
    </li>
  );
};

const SignedIn = () => {
  return (
    <>
      <li>
        <Button variant="ghost" size="sm" asChild>
          <Link href="profile" className="hover:bg-transparent hover:underline">Profile</Link>
        </Button>
      </li>

      <li>
        {/* <SignoutButton /> */}
        Sign out
      </li>
    </>
  );
};

const SignedOut = () => {
  return (
    <>
      <li className="flex gap-2 font-semibold">
        <button>
          <Link href="/auth/signin">Login</Link>
        </button>
     /
        <button>
          <Link href="/auth/signup">Register</Link>
        </button>
      </li>
    </>
  );
};
