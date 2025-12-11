import { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { useData } from '../context/dataContext-hook';

const Dashboard = () => {
  const { inventory } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredInventory = inventory.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const displayedInventory = filteredInventory.slice(0, entriesPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-success/10 text-success';
      case 'Low Stock':
        return 'bg-warning/10 text-warning';
      case 'Out of Stock':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your warehouse inventory</p>
        </div>

        <div className="bg-card rounded-lg shadow-card border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <TextField
                fullWidth
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                className="pl-10!"
              />
            </div>

            <FormControl size="small" className="ml-4! min-w-[150px]!">
              <InputLabel>Show entries</InputLabel>
              <Select
                value={entriesPerPage}
                label="Show entries"
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Sub Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Qty</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Barcode</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Suspended</th>
                </tr>
              </thead>
              <tbody>
                {displayedInventory.map((item, index) => (
                  <tr key={index} className="border-b border-border hover:bg-accent transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{item.code}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.subCategory}</td>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{item.productName}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.qty}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.size}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{item.barcode}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.suspended ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {displayedInventory.length} of {filteredInventory.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
