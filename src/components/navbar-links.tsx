"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignoutButton } from "@/components/signout-button";

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
        <SignoutButton />
      </li>
    </>
  );
};

const SignedOut = () => {
  return (
    <>
      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/signin">Sign in</Link>
        </Button>
      </li>

      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/signup">Sign up</Link>
        </Button>
      </li>
    </>
  );
};
