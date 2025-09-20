import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { UpdateUserFormData, updateUserSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateUser } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const UpdateUserForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      username: "",
    },
  });

  const submitNewPassword = async (data: UpdateUserFormData) => {
    await updateUser({
      name: data.name,
      username: data.username,
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
          toast.success("Informations updated successfully");
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form className="mt-10 space-y-4 mx-auto max-w-xl flex flex-col" onSubmit={form.handleSubmit(submitNewPassword)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label>Enter new name</Label>
              <FormControl>
                <Input type="text" id="name" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label>Enter new username</Label>
              <FormControl>
                <Input type="text" id="username" required {...field} />
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
export default UpdateUserForm;
