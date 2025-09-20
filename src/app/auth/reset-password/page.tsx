import ResetPasswordForm from "@/components/reset-password-form";

type ResetPasswordProps = {
  searchParams: Promise<{ token?: string }>;
};

const Page = async ({ searchParams }: ResetPasswordProps) => {
  const token = (await searchParams).token;

  return (
    <div className="mx-auto w-sm rounded-lg mt-20 text-center border border-black space-y-4 p-8 ">
      <h1 className="font-bold text-xl">Password Reset</h1>
      <ResetPasswordForm />
    </div>
  );
};
export default Page;
