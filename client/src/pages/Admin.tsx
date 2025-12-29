import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { customerOrderSchema, type customerOrderSchemaType } from "../zod-validator/customerOrderSchema";
import { useEffect, useState } from "react";


type OrderPreviewItem = {
  code: string;
  productName: string;
  size: string;
  price: number;
  qty: number;
  total: number;
};

type InventoryItemType2 = {
  productName: string;
  category: string;
  subCategory: string;
  size: string;
  code: string;
  barcode: string;
  qty: number;
  brand: string;
  price: number;
};

export default function  Admin(){

  const {
      register,
      handleSubmit,
      getValues,
      formState: {errors, isSubmitting}
  } = useForm<customerOrderSchemaType>({resolver: zodResolver(customerOrderSchema)})
  const [items, setItems] = useState<InventoryItemType2[]>([])
  const [addedOrderItems, setAddedOrderItems] = useState<OrderPreviewItem[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {

    const getItems = async() => {

      const itemsList = await fetch(`${BASE_URL}/inventory/getItems`);
      const result = await itemsList.json();
      setItems(result)
    }

    getItems();
  },[BASE_URL])



  const customerOrderHandler = () => {
      const productCode = getValues("product");
const qty = Number(getValues("qty"));

if (!productCode) {
  alert("Please select a product");
  return;
}

if (Number.isNaN(qty) || qty <= 0) {
  alert("Quantity must be at least 1");
  return;
}

const product = items.find(i => i.code === productCode);
if (!product) return;

 setAddedOrderItems(prev => {
  const existing = prev.find(i => i.code === product.code);

  if (existing) {
    return prev.map(i =>
      i.code === product.code
        ? {
            ...i,
            qty: i.qty + qty,
            total: (i.qty + qty) * i.price
          }
        : i
    );
  }

  return [
    ...prev,
    {
      code: product.code,
      productName: product.productName,
      size: product.size,
      price: product.price,
      qty,
      total: qty * product.price
    }
  ];
});

    
  }

 
  return (
    <div className="bg-white border flex flex-col justify-center items-center min-h-screen rounded-lg p-6">
      <h2 className="text-2xl py-5 font-semibold mb-4">Customer Order</h2>

<form onSubmit={handleSubmit(customerOrderHandler)} className="w-full max-w-md space-y-5">
  {errors.root && (<p className="text-sm text-red-500">{errors.root.message}</p>)}
  {/* Customer */}
      <label className="block text-sm text-left font-medium mb-1">Shop Name</label>
      <input
      {...register("shopName")}
        type="text"
        placeholder="Tech Store NYC"
        className=" w-full border rounded p-2"
      />
      {errors.shopName && (<p className="text-sm text-red-500">{errors.shopName.message}</p>)}

      <label className="block text-sm text-left font-medium mb-1">Contact Email</label>
      <input
      {...register("email")}
        type="email"
        placeholder="orders@techstore.com"
        className=" border w-full rounded p-2"
      />
      {errors.email && (<p className="text-sm text-red-500 ">{errors.email.message}</p>)}
  {/* Address */}
  <div className="mb-6">
    <label className="block text-sm text-left font-medium mb-1">Delivery Address</label>
    <textarea
    {...register("address")}
      rows={2}
      placeholder="123 Broadway, New York, NY"
      className=" border w-full rounded p-2"
    />
    {errors.address && (<p className="text-sm text-red-500 ">{errors.address.message}</p>)}
  </div>

  {/* Order Items */}
  <div className="mb-6">
    <h3 className="font-semibold text-left mb-3">Order Items</h3>

   <div className="flex gap-3 mb-2">
  <select
    {...register("product")}
    defaultValue=""
    className="border w-full rounded"
  >
    <option value="">Select product</option>

    {items.map(item => (
      <option key={item.code} value={item.code}>
        {item.productName} – {item.size}
      </option>
    ))}
  </select>

  <input
    {...register("qty", { valueAsNumber: true })}
    type="number"
    placeholder="Qty"
    className="w-24 border border-border rounded"
  />

  <button
    type="button"
    onClick={customerOrderHandler}
    className="px-4 py-2 bg-slate-900 text-white rounded"
  >
    Add
  </button>
</div>
      {errors.qty && (<p className="text-sm text-red-500 p-3">{errors.qty.message}</p>)}

      <div className="mt-4 border rounded-lg p-4 bg-gray-300">
        <h4 className="font-semibold mb-3">Order Preview</h4>

        <div className="grid grid-cols-5 text-sm font-medium border-b pb-2 mb-2">
          <span>Product</span>
          <span>Size</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total</span>
        </div>

{addedOrderItems.map(item => (
  <div
    key={item.code}
    className="grid grid-cols-5 text-sm py-2 border-b"
  >
    <span>{item.productName}</span>
    <span>{item.size}</span>
    <span>{item.qty}</span>
    <span>{item.price}</span>
    <span>{item.total}</span>
  </div>
))}

      </div>
  </div>

    <button type="button" className="px-6 py-2 hover:bg-slate-100 cursor-pointer border w-72 rounded">
      Cancel
    </button>
    <button type="submit" className="px-6 py-2 w-72 cursor-pointer hover:bg-slate-700 transition-colors bg-slate-900 text-white rounded">
      {isSubmitting ? "Submitting..." : "Submit Order"}
    </button>

    </form>
  </div>
  );
};


