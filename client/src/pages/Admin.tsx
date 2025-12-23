export default function  Admin(){
  return (
    <div className="bg-white border flex flex-col justify-center items-center min-h-screen rounded-lg p-6">
      <h2 className="text-2xl py-5 font-semibold mb-4">Customer Order</h2>

<form  className="w-full max-w-md space-y-5">
  {/* Customer */}
      <label className="block text-sm text-left font-medium mb-1">Shop Name</label>
      <input
        type="text"
        placeholder="Tech Store NYC"
        className=" w-full border rounded p-2"
      />

      <label className="block text-sm text-left font-medium mb-1">Contact Email</label>
      <input
        type="email"
        placeholder="orders@techstore.com"
        className=" border w-full rounded p-2"
      />
  {/* Address */}
  <div className="mb-6">
    <label className="block text-sm text-left font-medium mb-1">Delivery Address</label>
    <textarea
      rows={2}
      placeholder="123 Broadway, New York, NY"
      className=" border w-full rounded p-2"
    />
  </div>

  {/* Order Items */}
  <div className="mb-6">
    <h3 className="font-semibold text-left mb-3">Order Items</h3>

    <div className="flex gap-3 mb-2">
      <select className=" border w-full rounded p-2">
        <option>Select product</option>
        <option>Product A</option>
        <option>Product B</option>
      </select>

      <input
        type="number"
        placeholder="Qty"
        className="w-24 border border-border rounded p-2"
      />

      <button className="px-4 py-2 hover:bg-slate-700 bg-slate-900 transition-colors cursor-pointer text-white rounded">
        Add
      </button>
    </div>
  </div>

    <button type="button" className="px-6 py-2 hover:bg-slate-100 cursor-pointer border w-72 rounded">
      Cancel
    </button>
    <button type="submit" className="px-6 py-2 w-72 cursor-pointer hover:bg-slate-700 transition-colors bg-slate-900 text-white rounded">
      Submit Order
    </button>

    </form>
  </div>
  );
};


