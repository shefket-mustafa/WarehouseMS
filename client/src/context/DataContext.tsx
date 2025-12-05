import {  useState, type ReactNode } from 'react';
import { DataContext } from './dataContext-hook';

export interface InventoryItem {
  code: string;
  category: string;
  subCategory: string;
  productName: string;
  qty: number;
  size: string;
  barcode: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  suspended: boolean;
}

export interface Order {
  id: string;
  shopName: string;
  email: string;
  address: string;
  total: number;
  vat: number;
  orderDate: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  companyName: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
}

export interface Brand {
  id: string;
  name: string;
  itemCount: number;
}

export interface DataContextType {
  inventory: InventoryItem[];
  orders: Order[];
  customers: Customer[];
  categories: Category[];
  brands: Brand[];
}

// Sample data
const sampleInventory: InventoryItem[] = [
  {
    code: 'WH001',
    category: 'Electronics',
    subCategory: 'Smartphones',
    productName: 'iPhone 14 Pro',
    qty: 45,
    size: '256GB',
    barcode: '1234567890123',
    status: 'In Stock',
    suspended: false,
  },
  {
    code: 'WH002',
    category: 'Electronics',
    subCategory: 'Laptops',
    productName: 'MacBook Pro M2',
    qty: 12,
    size: '16" 512GB',
    barcode: '1234567890124',
    status: 'Low Stock',
    suspended: false,
  },
  {
    code: 'WH003',
    category: 'Furniture',
    subCategory: 'Office Chairs',
    productName: 'Ergonomic Office Chair',
    qty: 0,
    size: 'Standard',
    barcode: '1234567890125',
    status: 'Out of Stock',
    suspended: false,
  },
  {
    code: 'WH004',
    category: 'Electronics',
    subCategory: 'Tablets',
    productName: 'iPad Air',
    qty: 28,
    size: '64GB',
    barcode: '1234567890126',
    status: 'In Stock',
    suspended: false,
  },
  {
    code: 'WH005',
    category: 'Furniture',
    subCategory: 'Desks',
    productName: 'Standing Desk',
    qty: 15,
    size: '180x80cm',
    barcode: '1234567890127',
    status: 'In Stock',
    suspended: false,
  },
];

const sampleOrders: Order[] = [
  {
    id: 'ORD001',
    shopName: 'Tech Store NYC',
    email: 'contact@techstore.com',
    address: '123 Broadway, New York, NY 10001',
    total: 2499.99,
    vat: 249.99,
    orderDate: '2025-11-28',
    status: 'Delivered',
  },
  {
    id: 'ORD002',
    shopName: 'Office Solutions LA',
    email: 'orders@officesolutions.com',
    address: '456 Main St, Los Angeles, CA 90012',
    total: 1299.99,
    vat: 129.99,
    orderDate: '2025-11-29',
    status: 'Shipped',
  },
  {
    id: 'ORD003',
    shopName: 'Gadget World',
    email: 'info@gadgetworld.com',
    address: '789 Tech Ave, San Francisco, CA 94102',
    total: 899.99,
    vat: 89.99,
    orderDate: '2025-11-30',
    status: 'Processing',
  },
];

const sampleCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'John Smith',
    email: 'john.smith@techstore.com',
    address: '123 Broadway, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    companyName: 'Tech Store NYC',
  },
  {
    id: 'CUST002',
    name: 'Sarah Johnson',
    email: 'sarah.j@officesolutions.com',
    address: '456 Main St, Los Angeles, CA 90012',
    phone: '+1 (555) 234-5678',
    companyName: 'Office Solutions LA',
  },
  {
    id: 'CUST003',
    name: 'Michael Chen',
    email: 'michael@gadgetworld.com',
    address: '789 Tech Ave, San Francisco, CA 94102',
    phone: '+1 (555) 345-6789',
    companyName: 'Gadget World',
  },
];

const sampleCategories: Category[] = [
  { id: 'CAT001', name: 'Electronics', itemCount: 125 },
  { id: 'CAT002', name: 'Furniture', itemCount: 68 },
  { id: 'CAT003', name: 'Office Supplies', itemCount: 342 },
  { id: 'CAT004', name: 'Clothing', itemCount: 89 },
];

const sampleBrands: Brand[] = [
  { id: 'BRD001', name: 'Apple', itemCount: 45 },
  { id: 'BRD002', name: 'Samsung', itemCount: 38 },
  { id: 'BRD003', name: 'Herman Miller', itemCount: 22 },
  { id: 'BRD004', name: 'Dell', itemCount: 31 },
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [inventory] = useState<InventoryItem[]>(sampleInventory);
  const [orders] = useState<Order[]>(sampleOrders);
  const [customers] = useState<Customer[]>(sampleCustomers);
  const [categories] = useState<Category[]>(sampleCategories);
  const [brands] = useState<Brand[]>(sampleBrands);

  return (
    <DataContext.Provider value={{ inventory, orders, customers, categories, brands }}>
      {children}
    </DataContext.Provider>
  );
};


