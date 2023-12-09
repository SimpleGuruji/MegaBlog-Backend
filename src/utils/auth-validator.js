import { z } from "zod";

const signupSchema = z.object({
  fullName: z
    .string({ required_error: "fullName is required" })
    .trim()
    .min(3, { message: "fullNmae must be atleast three characters" })
    .max(30, {
      message: "fullName should not be greater than thirty characters",
    }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min()
    .min(3, { message: "Email must be atleast three characters" })
    .max(50, {
      message: "Email should not be greater than fifty characters",
    })
    .email({ message: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be atleast 7 characters" })
    .max(30, {
      message: "password should not be greater than thirty characters",
    }),
});

export { signupSchema };
