"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const RegisterForm = () => {
  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const name = formData.get("name") as string;
    if (!name) return toast.error("Name is required");
    const email = formData.get("email") as string;
    if (!email) return toast.error("Email is required");
    const password = formData.get("password") as string;
    if (!password) return toast.error("Password is required");
    console.log(name, email, password);
  };

  return (
    <form onSubmit={handleSumbit} className="max-w-sm w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <Button
        type="submit"
        className="w-full bg-black text-white cursor-pointer"
      >
        Register
      </Button>
    </form>
  );
};
export default RegisterForm;
