"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SiGithub,
  SiGithubHex,
  SiGoogle,
  SiGoogleHex,
} from "@icons-pack/react-simple-icons";
import { oauthSigninAction } from "@/actions/oauth-signin-action";
import { useSearchParams } from "next/navigation";

type OAuthSigninButtonsProps = {
  signup?: boolean;
};

export default function OAuthSigninButtons({
  signup,
}: OAuthSigninButtonsProps) {
  const [errMessage, setErrMessage] = useState("");

  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  useEffect(() => {
    if (!error) return;

    if (error === "OAuthAccountNotLinked") {
      setErrMessage("This account is already in use. Please sign in.");
    } else {
      setErrMessage("An error ocurred. Please try again.");
    }
  }, [error]);

  const clickHandler = async (provider: "google" | "github") => {
    try {
      await oauthSigninAction(provider);
    } catch (error) {
      console.log(error);
    }
  };
  const text = signup ? "Sign up" : "Sign in";

  return (
    <div className="max-w-[400px]">
      <Button
        variant="secondary"
        onClick={() => clickHandler("google")}
        className="w-full"
      >
        <SiGoogle color={SiGoogleHex} className="mr-2" />
        {text} with Google
      </Button>

      <Button
        variant="secondary"
        onClick={clickHandler.bind(null, "github")}
        className="mt-2 w-full"
      >
        <SiGithub color={SiGithubHex} className="mr-2" />
        {text} with Github
      </Button>

      {errMessage && (
        <p className="text-destructive mt-2 text-center text-sm font-medium">
          {errMessage}
        </p>
      )}
    </div>
  );
}


type OAuthSigninButtonsSkeletonProps = OAuthSigninButtonsProps

export const OAuthSigninButtonSkeleton = ({signup}: OAuthSigninButtonsSkeletonProps) => {
  return (
    <div className="max-w-[400px]">
      <Button variant="secondary" className="w-full">
        <SiGoogle color={SiGoogleHex} className="mr-2" />
        Sign in with Google
      </Button>

      <Button variant="secondary" className="mt-2 w-full">
        <SiGithub color={SiGithubHex} className="mr-2" />
        Sig in with Github
      </Button>
    </div>
  );
};
