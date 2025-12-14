import {z} from "zod";

export const registerSchema = z.object({
    companyName: z.string().min(3, "Company Name must be at least 3 characters"),
    email: z.string().email("Invalid email address!"),
    password: z.string().min(6, "Password must be at least 6 characters!"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters!")
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match!"
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
