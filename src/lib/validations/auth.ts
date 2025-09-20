import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .trim(),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Password cannot be empty"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const emailSchema = z.object({
  email: z
    .string()
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"),
});

export const emailLoginSchema = z.object({
  email: z
    .string()
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"),
  password: z.string().min(1, "Password cannot be empty"),
});

export const usernameLoginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

export type UsernameLoginFormData = z.infer<typeof usernameLoginSchema>;

export type EmailLoginFormData = z.infer<typeof emailLoginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;

export type PasswordFormData = z.infer<typeof passwordSchema>;
