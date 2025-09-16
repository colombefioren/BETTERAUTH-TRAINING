import RegisterForm from "@/components/register-form";

const Register = () => {
  return (
    <div className="flex bg-black/30 items-center justify-center min-h-screen">
      <div className="mx-auto w-sm rounded-lg bg-white border border-black space-y-8 p-8 ">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Register</h1>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
