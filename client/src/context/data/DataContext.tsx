import {  useEffect, useState, type ReactNode } from 'react';
import { DataContext } from './dataContext-hook';

export interface InventoryItem {
  code: string;
  category: string;
  subCategory: string;
  productName: string;
  qty: string;
  size: string;
  barcode: string;
  brand: string;
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
  name: string;
  itemCount: number;
}

export interface CategoryItem {
  code: string;
  productName: string;
  brand: string;
  category: string;
  qty: number;
}

export interface Brand {
  name: string;
  itemCount: number;
}

export interface DataContextType {
  inventory: InventoryItem[];
  orders: Order[];
  customers: Customer[];
  categories: Category[];
  categoryItems: CategoryItem[];
  brands: Brand[];
  brandItems: CategoryItem[];
  categoryClickHandler: (category: string) => void;
  brandsClickHandler: (brand: string) => void;
}

// Sample data
const sampleInventory: InventoryItem[] = []


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


export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [inventory] = useState<InventoryItem[]>(sampleInventory);
  const [orders] = useState<Order[]>(sampleOrders);
  const [customers] = useState<Customer[]>(sampleCustomers);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandItems, setBrandItems] = useState<CategoryItem[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {

     fetch(`${BASE_URL}/inventory/categories`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      setCategories(data)
    })
  },[BASE_URL])

   useEffect(() => {

     fetch(`${BASE_URL}/inventory/brands`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      setBrands(data)
    })
  },[BASE_URL])

  const categoryClickHandler = async(category: string) => {

    const res = await fetch(`${BASE_URL}/inventory/categories/${category}`)
    const categoryItems = await res.json();

    setCategoryItems(categoryItems)
    setBrandItems([]);
  }

   const brandsClickHandler = async(brand: string) => {

    const res = await fetch(`${BASE_URL}/inventory/brands/${brand}`)
    const brandItems = await res.json();

    setBrandItems(brandItems)
    setCategoryItems([])
  }

  return (
    <DataContext.Provider 
    value={{ 
      inventory, 
      orders, 
      customers, 
      categories, 
      categoryItems, 
      categoryClickHandler,
       brands, 
       brandItems,
       brandsClickHandler
        }}>
      {children}
    </DataContext.Provider>
  );
};


