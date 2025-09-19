"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { sendVerificationEmail } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { emailSchema } from "@/lib/validations/auth";

const SendMailButton = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email });
    if (result.error) {
      toast.error(result.error.issues[0]?.message || "Invalid email");
      return;
    }
    await sendVerificationEmail({
      email,
      callbackURL: "/auth/verify",
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
        onSuccess: () => {
          toast.success(
            "Verification email sent successfully. Check your email!"
          );
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <Label htmlFor="email">Retype your email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <Button
          type="submit"
          disabled={isPending}
          className="bg-black text-white cursor-pointer"
        >
          Send Verification Mail
        </Button>
        ;
      </form>
    </>
  );
};
export default SendMailButton;
