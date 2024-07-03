import * as z from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    name: z.string().min(1, {
      message: "Please enter your name",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginSchema = z.object({
  name: z.string().min(1, { message: "Please enter a valid name!" }).max(50, {
    message: "Name must be shorter than or equal to 4 characters!",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long!",
    })
    .max(100),
});

export const TokenSchema = z.object({
  type: z.string(),
  accessToken: z.string(),
});
