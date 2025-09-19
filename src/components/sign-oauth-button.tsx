"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignOauthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
}

const SignOauthButton = ({ provider, signUp }: SignOauthButtonProps) => {
  const action = signUp ? "Up" : "In";
  const [isPending, setIsPending] = useState(false);
  const providerName = provider === "google" ? "Google" : "Github";

  const handleClick = async () => {
   await signIn.social({
    provider,
    callbackURL: "/profile",
    errorCallbackURL:"/auth/login/error",
    fetchOptions: {
      onRequest: () => {
        setIsPending(true);
      },
      onResponse: () => {
        setIsPending(false);
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    }
   })
  };
  return (
    <Button className="cursor-pointer border-black border" onClick={handleClick} disabled={isPending}>
      Sign {action} with {providerName}
    </Button>
  );
};
export default SignOauthButton;
