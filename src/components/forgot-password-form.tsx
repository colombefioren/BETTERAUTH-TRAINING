"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgetPassword } from "@/lib/auth-client";
import { emailSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const submitEmail = async (data: { email: string }) => {
    await forgetPassword({
      email: data.email,
      redirectTo: "/auth/reset-password",
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {
          toast.success(
            "Password reset link sent successfully. Check your email!"
          );
          router.push("/auth/forgot-password/success");
        },
      },
    });
  };
  return (
    <Form {...form}>
      <form
        className="mt-10 space-y-4 mx-auto max-w-xl flex flex-col"
        onSubmit={form.handleSubmit(submitEmail)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Enter your email</Label>
              <FormControl>
                <Input {...field} type="email" id="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          className="bg-black text-white cursor-pointer"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default ForgotPasswordForm;
