import ForgotPasswordForm from "@/components/forgot-password-form";

const Page = () => {
  return (
    <div className="mx-auto w-sm rounded-lg mt-20 text-center border border-black space-y-4 p-8 ">
      <h1 className="font-bold text-xl">Password Reset</h1>
      <ForgotPasswordForm />
    </div>
  );
};
export default Page;
