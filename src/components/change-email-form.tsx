import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { EmailFormData, emailSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { changeEmail } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const ChangeEmailForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const submitNewPassword = async (data: EmailFormData) => {
    await changeEmail({
      newEmail: data.email,
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
          toast.success("Email changed successfully");
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitNewPassword)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Enter new email</Label>
              <FormControl>
                <Input type="email" id="email" required {...field} />
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
          Change Email
        </Button>
      </form>
    </Form>
  );
};
export default ChangeEmailForm;
