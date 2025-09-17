"use client";

import { type EmailLoginFormData, emailLoginSchema, UsernameLoginFormData, usernameLoginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const emailForm = useForm<EmailLoginFormData>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const usernameForm = useForm<UsernameLoginFormData>({
    resolver: zodResolver(usernameLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  const handleLoginEmail = async (data: EmailLoginFormData) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          if (ctx.error.code === "SCHEMA_VALIDATION_FAILED") {
            const field = ctx.error.details.issues[0].path[0];
            emailForm.setError(field, {
              type: "server",
              message: ctx.error.details.issues[0].message,
            });
          }
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Signed in successfully");

          router.push("/profile");
        },
      }
    );
  };

    const handleLoginUsername = async (data: UsernameLoginFormData) => {
    await signIn.username(
      {
        username: data.username,
        password: data.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          if (ctx.error.code === "SCHEMA_VALIDATION_FAILED") {
            const field = ctx.error.details.issues[0].path[0];
            emailForm.setError(field, {
              type: "server",
              message: ctx.error.details.issues[0].message,
            });
          }
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Signed in successfully");

          router.push("/profile");
        },
      }
    );
  };

  return (
    <Tabs defaultValue="email">
      <TabsList className="w-full mb-5">
        <TabsTrigger className="bg-gray-100 cursor-pointer text-black px-4 py-2  hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white" value="email">Email</TabsTrigger>
        <TabsTrigger className="bg-gray-100 cursor-pointer text-black px-4 py-2 hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white" value="username">Username</TabsTrigger>
      </TabsList>
      <TabsContent value="email">
        <Form {...emailForm}>
          <form className="space-y-6" onSubmit={emailForm.handleSubmit(handleLoginEmail)}>
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      type="email"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={emailForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="w-full bg-black text-white cursor-pointer"
              type="submit"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>
            <div className="text-sm font-semibold text-center">
              Don&apos;t have an account?{" "}
              <Link className="underline" href="/auth/register">
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="username">
        <Form {...usernameForm}>
          <form className="space-y-6" onSubmit={usernameForm.handleSubmit(handleLoginUsername)}>
            <FormField
              control={usernameForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      type="text"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={usernameForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="w-full bg-black text-white cursor-pointer"
              type="submit"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>
            <div className="text-sm font-semibold text-center">
              Don&apos;t have an account?{" "}
              <Link className="underline" href="/auth/register">
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};
export default LoginForm;
