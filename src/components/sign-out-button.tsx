"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess() {
          router.push("/auth/login");
          toast.success("Signed out successfully");
        },
      },
    });
  };
  return (
    <Button
      onClick={handleClick}
      className="bg-red-700 tex-white cursor-pointer"
      variant="destructive"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Sign out"}
    </Button>
  );
};
export default SignOutButton;
