import type { Document } from "mongoose";
export type UserModalType = {
    companyName: string,
    email: string,
    password: string
}

export interface InventoryItem extends Document {
  productName: string;
  category: string;
  subCategory?: string;
  brand?: string;
  size?: string;
  code: string;
  barcode?: string;
  qty: number;
  status: "Low Stock" | "Out of Stock" | "In Stock";
  createdAt: Date;
  updatedAt: Date;
}