import { model, Schema } from "mongoose";
import { InventoryItem } from "../serverTypes.js";

const inventorySchema = new Schema<InventoryItem>(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
      brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    barcode: {
      type: String,
      default: "",
    },
    qty: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const InventoryModel = model<InventoryItem>("Inventory", inventorySchema);