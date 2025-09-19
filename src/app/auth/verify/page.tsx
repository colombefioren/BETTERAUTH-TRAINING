import SendMailButton from "@/components/send-mail-button";
import { redirect } from "next/navigation";

type AuthVerifyProps = {
  searchParams: Promise<{ error?: string }>;
};

const AuthVerify = async ({ searchParams }: AuthVerifyProps) => {
  const sq = await searchParams;

  if (!sq.error) {
    redirect("/profile");
  }

  const getErrorMessage = () => {
    if (sq.error === "invalid_token") {
      return "Token is invalid";
    } else if (sq.error === "token_expired") {
      return "Token is expired";
    } else if (sq.error === "email_not_verified") {
      return "";
    } else {
      return "Something went wrong";
    }
  };

  return (
    <div className="mx-auto w-sm rounded-lg mt-20 text-center border border-black space-y-8 p-8 ">
      <h1 className="text-xl font-bold">
        {sq.error === "email_not_verified"
          ? "Verify Your Email"
          : "An Error Occured"}
      </h1>
      <p className="text-red-500 text-sm">{getErrorMessage()}</p>
      <SendMailButton />
    </div>
  );
};
export default AuthVerify;
