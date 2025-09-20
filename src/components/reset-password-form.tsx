import { useForm } from "react-hook-form";


const ResetPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return <div>ResetPasswordForm</div>;
};
export default ResetPasswordForm;
