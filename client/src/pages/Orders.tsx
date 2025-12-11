import { useState } from 'react';
import { TextField } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { useData } from '../context/dataContext-hook';

const Orders = () => {
  const { orders } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success/10 text-success';
      case 'Shipped':
        return 'bg-info/10 text-info';
      case 'Processing':
        return 'bg-warning/10 text-warning';
      case 'Pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Orders List</h1>
          <p className="text-muted-foreground">Track and manage incoming orders</p>
        </div>

        <div className="bg-card rounded-lg shadow-card border border-border p-6">
          <div className="mb-6">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <TextField
                fullWidth
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                className="pl-10!"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Shop Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Address</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">VAT</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Order Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-accent transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{order.shopName}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{order.email}</td>
                    <td className="px-4 py-3 text-sm text-foreground max-w-xs truncate">{order.address}</td>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-foreground">${order.vat.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{order.orderDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredOrders.length} orders
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
