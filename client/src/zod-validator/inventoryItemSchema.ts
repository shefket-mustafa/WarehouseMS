import z from "zod";

export const inventoryItemSchema = z.object({
    product_name: z.string().min(4, "Product name must be at least 4 characters!"),
category: z.string().min(4, "Category must be at least 4 characters!"),
sub_category: z.string().min(4, "Sub Category must be at least 4 characters!"),
size: z.string().min(1, "Size must be at least 1 character!"),
barcode: z.string().min(11, "Barcode must be at least 1 character!"),
quantity: z.string().min(1, "Size must be at least 1 character!"),
brand: z.string().min(2, "Brand must be at least 2 characters!"),
price: z.string().min(1, "Price must be at least 1 character!"),

})

export type InventoryItemType = z.infer<typeof inventoryItemSchema>
