import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import {
  changePasswordFormData,
  changePasswordSchema,
} from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { changePassword } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const ChangePasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<changePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const submitNewPassword = async (data: changePasswordFormData) => {
    await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
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
          toast.success("Password changed successfully");
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitNewPassword)}>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <Label>Current Password</Label>
              <FormControl>
                <Input
                  type="password"
                  id="currentPassword"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <Label>New Password</Label>
              <FormControl>
                <Input type="password" id="newPassword" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <Label>Confirm New Password</Label>
              <FormControl>
                <Input
                  type="password"
                  id="confirmNewPassword"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          className="bg-black text-white cursor-pointer"
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
};
export default ChangePasswordForm;
