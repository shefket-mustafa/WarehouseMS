import { useState } from "react";
import { FiTag, FiAward } from "react-icons/fi";
import type { CategoryItem, InventoryFormInput } from "../context/data/DataContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventoryItemSchema } from "../zod-validator/inventoryItemSchema";
import { useData } from "../context/data/dataContext-hook";
import { useInventory } from "../context/inventory/inventory-context-hook";
import { statusReturner } from "../helpers/helpers";
import Loading from "../components/Loading";

const CategoriesBrands = () => {
  const {
    categories,
    categoryItems,
    categoryClickHandler,
    brands,
    brandItems,
    brandsClickHandler,
    isBrandsLoading,
    isCategoriesLoading,
    isItemsLoading,
  } = useData();
  const { addItem } = useInventory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const items = selectedCategory ? categoryItems : brandItems;

  const {
    handleSubmit,
    setError,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<InventoryFormInput>({
    resolver: zodResolver(inventoryItemSchema),
  });

  const handleAddItem = async (data: InventoryFormInput) => {
    try {
      const result = await addItem(data);

      console.log(result);
      reset();
    } catch (err) {
      if (err instanceof Error) {
        setError("root", {
          message: err.message,
        });
      } else {
        setError("root", { message: "Failed to add item!" });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-background bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Categories & Brands
          </h1>
          <p className="text-muted-foreground">
            Browse products by category or brand
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Categories */}
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiTag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-card-foreground">
                Categories
              </h2>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(
                      category.name === selectedCategory ? null : category.name
                    );
                    categoryClickHandler(category.name);
                    setSelectedBrand(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors cursor-pointer ${
                    selectedCategory === category.name
                      ? "bg-slate-950 text-white border-primary"
                      : "bg-card border-border hover:bg-accent"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm opacity-75">
                      {category.itemCount} items
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {isCategoriesLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                <Loading />
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiAward className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-card-foreground">
                Brands
              </h2>
            </div>
            <div className="space-y-2">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => {
                    setSelectedBrand(
                      brand.name === selectedBrand ? null : brand.name
                    );
                    brandsClickHandler(brand.name);
                    setSelectedCategory(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedBrand === brand.name
                      ? "bg-slate-950 text-white border-primary"
                      : "bg-card border-border hover:bg-accent"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{brand.name}</span>
                    <span className="text-sm opacity-75">
                      {brand.itemCount} items
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {isBrandsLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                <Loading />
              </div>
            )}
          </div>
        </div>

        {/* Filtered Items */}
        {(selectedCategory || selectedBrand) && (
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <h3 className="text-lg font-semibold mb-4 text-card-foreground">
              {selectedCategory
                ? `Items in ${selectedCategory}`
                : `Items from ${selectedBrand}`}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Code
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Brand
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: CategoryItem, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-border text-left hover:bg-accent transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-foreground">
                        {item.code}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {item.product_name}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {item.brand}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {statusReturner(item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isItemsLoading && (
                <div className="flex items-center justify-center ">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Add item */}
      <section className="flex flex-col justify-center items-center w-full ">
        <h1 className="text-center text-3xl  font-bold">Add items</h1>
        <p className="text-muted-foreground py-2">
          Add products to the database
        </p>

        <form
          onSubmit={handleSubmit(handleAddItem)}
          className="flex flex-col gap-2 mt-2 w-[500px] mb-10 py-5 items-center justify-center align-middle border px-20 border-border rounded-lg"
        >
          {errors.root && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.root.message}
            </p>
          )}
          <label>Product Name</label>
          <input
            {...register("product_name")}
            type="text"
            placeholder="Product Name"
            className="border border-border round p-1 w-full text-sm focus:otline-none focus:ring-2 focus:ring-primary rounded-sm"
          />
          {errors.product_name && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.product_name.message}
            </p>
          )}

          <label>Brand</label>
          <input
            {...register("brand")}
            type="text"
            placeholder="Brand"
            className="border border-border round p-1 w-full text-sm focus:otline-none focus:ring-2 focus:ring-primary rounded-sm"
          />
          {errors.brand && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.brand.message}
            </p>
          )}

           <label>Price</label>
          <input
            {...register("price")}
            type="text"
            placeholder="Price"
            className="border border-border round p-1 w-full text-sm focus:otline-none focus:ring-2 focus:ring-primary rounded-sm"
          />
          {errors.price && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.price.message}
            </p>
          )}

          <label>Category</label>
          <input
            {...register("category")}
            type="text"
            placeholder="Category"
            className="border border-border round p-1 w-full text-sm focus:otline-none focus:ring-2 focus:ring-primary rounded-sm"
          />
          {errors.category && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.category.message}
            </p>
          )}

          <label>Sub Category</label>
          <input
            {...register("sub_category")}
            type="text"
            placeholder="Sub Category"
            className="border border-border round p-1 w-full text-sm focus:otline-none focus:ring-2 focus:ring-primary rounded-sm"
          />
          {errors.sub_category && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.sub_category.message}
            </p>
          )}

          <label>Size</label>
          <input
            {...register("size")}
            type="text"
            placeholder="Size"
            className="border border-border round p-1 w-full text-sm focus:otline-none focus:ring-2 focus:ring-primary rounded-sm"
          />
          {errors.size && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.size.message}
            </p>
          )}

          <label>Barcode</label>
          <input
            {...register("barcode")}
            type="text"
            placeholder="Barcode"
            className="border border-border round p-1 w-full text-sm focus:otline-none focus:ring-2 focus:ring-primary rounded-sm"
          />
          {errors.barcode && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.barcode.message}
            </p>
          )}

          <label>Quantity</label>
          <input
            {...register("quantity")}
            type="text"
            placeholder="Quantity"
            className="border border-border round p-1 w-full text-sm focus:otline-none focus:ring-2 focus:ring-primary rounded-sm"
          />
          {errors.quantity && (
            <p className="text-sm text-red-500 text-center mb-3 p-1">
              {errors.quantity.message}
            </p>
          )}

          <div className="flex justify-end gap-5">
            <button className="bg-slate-900 text-white py-1 px-5 rounded-sm">
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button className="bg-slate-900 text-white py-1 px-5 rounded-sm">
              Reset
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CategoriesBrands;
