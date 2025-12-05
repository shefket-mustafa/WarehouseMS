import { useState } from 'react';
import { TextField } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { useData } from '../context/dataContext-hook';

const Customers = () => {
  const { customers } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>

        <div className="bg-card rounded-lg shadow-card border border-border p-6">
          <div className="mb-6">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <TextField
                fullWidth
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                className="!pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Customer ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Customer Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Address</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Company Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border hover:bg-accent transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{customer.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{customer.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{customer.email}</td>
                    <td className="px-4 py-3 text-sm text-foreground max-w-xs truncate">{customer.address}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{customer.phone}</td>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{customer.companyName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredCustomers.length} customers
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
