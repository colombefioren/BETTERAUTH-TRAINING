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
import { resetPassword } from "@/lib/auth-client";
import { type PasswordFormData, passwordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const submitNewPassword = async (data: PasswordFormData) => {
    await resetPassword({
      token,
      newPassword: data.password,
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
          toast.success("Password reset successfully");
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 space-y-4 mx-auto max-w-xl flex flex-col"
        onSubmit={form.handleSubmit(submitNewPassword)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">Enter New Password</Label>
              <FormControl>
                <Input {...field} type="password" id="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <FormControl>
                <Input {...field} type="password" id="confirmPassword" />
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
export default ResetPasswordForm;
