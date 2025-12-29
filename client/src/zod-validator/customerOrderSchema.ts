import {z}from "zod";

export const customerOrderSchema = z.object({
    shopName: z.string().min(4, "Shop name must be at least 4 characters!"),
    email: z.string().email("Invalid email address!"),
    address: z.string().min(10, "Address must be at least 10 characters"),
    product: z.string().min(1, "Please select a product!"),
    qty: z.number().min(1, "Quantity must be at least 1!")

})

export type customerOrderSchemaType = z.infer<typeof customerOrderSchema>