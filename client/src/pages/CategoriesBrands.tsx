import { useState } from 'react';
import { FiTag, FiAward } from 'react-icons/fi';
import { useData } from '../context/dataContext-hook';

const CategoriesBrands = () => {
  const { categories, brands, inventory } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredItems = inventory.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedBrand && !item.productName.toLowerCase().includes(selectedBrand.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Categories & Brands</h1>
          <p className="text-muted-foreground">Browse products by category or brand</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Categories */}
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiTag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-card-foreground">Categories</h2>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.name === selectedCategory ? null : category.name);
                    setSelectedBrand(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border hover:bg-accent'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm opacity-75">{category.itemCount} items</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiAward className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-card-foreground">Brands</h2>
            </div>
            <div className="space-y-2">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => {
                    setSelectedBrand(brand.name === selectedBrand ? null : brand.name);
                    setSelectedCategory(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedBrand === brand.name
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border hover:bg-accent'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{brand.name}</span>
                    <span className="text-sm opacity-75">{brand.itemCount} items</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filtered Items */}
        {(selectedCategory || selectedBrand) && (
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <h3 className="text-lg font-semibold mb-4 text-card-foreground">
              {selectedCategory ? `Items in ${selectedCategory}` : `Items from ${selectedBrand}`}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Product Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Qty</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={index} className="border-b border-border hover:bg-accent transition-colors">
                      <td className="px-4 py-3 text-sm text-foreground">{item.code}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{item.productName}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{item.category}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{item.qty}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesBrands;
