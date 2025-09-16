import RegisterForm from "@/components/register-form";

const Register = () => {
  return (
    <div className="mx-auto max-w-screen-lg space-y-8 px-8 py-16">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Register</h1>
      </div>
      <RegisterForm/>
    </div>
  );
};
export default Register;
