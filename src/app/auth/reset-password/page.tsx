import ResetPasswordForm from "@/components/reset-password-form";
import { redirect } from "next/navigation";

type ResetPasswordProps = {
  searchParams: Promise<{ token?: string }>;
};

const Page = async ({ searchParams }: ResetPasswordProps) => {
  const token = (await searchParams).token;

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <div className="mx-auto w-sm rounded-lg mt-20 text-center border border-black space-y-4 p-8 ">
      <h1 className="font-bold text-xl">Password Reset</h1>
      <ResetPasswordForm token={token} />
    </div>
  );
};
export default Page;
