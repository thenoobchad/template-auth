"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  SiGithub,
  SiGithubHex,
  SiGoogle,
  SiGoogleHex,
} from "@icons-pack/react-simple-icons";
import { oauthSigninAction } from "@/actions/oauth-signin-action";

type OAuthSigninButtonsProps = {
  signup?: boolean;
};

export default function OAuthSigninButtons({
  signup,
}: OAuthSigninButtonsProps) {
  const text = signup ? "Sign up" : "Sign in";

  
  const clickHandler = async (provider: "google" | "github") => {
    await oauthSigninAction(provider);
  };

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
    </div>
  );
}
