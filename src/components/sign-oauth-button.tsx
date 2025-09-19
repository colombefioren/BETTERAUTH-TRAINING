"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface SignOauthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
}

const SignOauthButton = ({ provider, signUp }: SignOauthButtonProps) => {
  const action = signUp ? "Up" : "In";
  const [isPending, setIsPending] = useState(false);
  const providerName = provider === "google" ? "Google" : "Github";

  const handleClick = async () => {
    setIsPending(true);

    setIsPending(false);
  };
  return (
    <Button onClick={handleClick} disabled={isPending}>
      Sign {action} with {providerName}
    </Button>
  );
};
export default SignOauthButton;
