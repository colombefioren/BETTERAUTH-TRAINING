import LoginForm from "@/components/login-form";
import SignOauthButton from "@/components/sign-oauth-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/profile");
  }

  return (
    <div className="flex bg-black/30 items-center justify-center min-h-screen">
      <div className="mx-auto w-sm rounded-lg bg-white border border-black space-y-8 p-8 ">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Log In</h1>
        </div>
        <LoginForm />
        <div className="flex w-full flex-col space-y-4">
          <SignOauthButton provider="google" />
          <SignOauthButton provider="github" />
        </div>
      </div>
    </div>
  );
};
export default Login;
