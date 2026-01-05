import {  useEffect, useState, type ReactNode } from 'react';
import { DataContext } from './dataContext-hook';

export interface InventoryItem {
  category: string;
  subCategory: string;
  productName: string;
  price: string
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
  orders: Order[];
  customers: Customer[];
  categories: Category[];
  categoryItems: CategoryItem[];
  brands: Brand[];
  brandItems: CategoryItem[];
  categoryClickHandler: (category: string) => void;
  brandsClickHandler: (brand: string) => void;
  isCategoriesLoading: boolean;
isBrandsLoading: boolean;
isItemsLoading: boolean;

}

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
  const [orders] = useState<Order[]>([]);
  const [customers] = useState<Customer[]>(sampleCustomers);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandItems, setBrandItems] = useState<CategoryItem[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isCategoriesLoading, setCategoriesLoading] = useState(false)
  const [isBrandsLoading, setBrandsLoading] = useState(false)
  const [isItemsLoading, setItemsLoading] = useState(false)

  useEffect(() => {
    setCategoriesLoading(true);
    try{
      fetch(`${BASE_URL}/inventory/categories`)
     .then(res => res.json())
     .then(data => {
 
       setCategories(data)
     })
    }finally{
      setCategoriesLoading(false)
    }
  },[BASE_URL])

   useEffect(() => {
    setBrandsLoading(true);
try{
  fetch(`${BASE_URL}/inventory/brands`)
 .then(res => res.json())
 .then(data => {
   console.log(data);
   
   setBrands(data)
 })
}finally{
  setBrandsLoading(false)
}
  },[BASE_URL])

  const categoryClickHandler = async(category: string) => {
    setItemsLoading(true);
    try{
      const res = await fetch(`${BASE_URL}/inventory/categories/${category}`)
      const categoryItems = await res.json();
  
      setCategoryItems(categoryItems)
      setBrandItems([]);

    }finally{
      setItemsLoading(false)
    }
  }

   const brandsClickHandler = async(brand: string) => {
    setItemsLoading(true);
    try{
      const res = await fetch(`${BASE_URL}/inventory/brands/${brand}`)
      const brandItems = await res.json();
  
      setBrandItems(brandItems)
      setCategoryItems([])
    }finally{
      setItemsLoading(false)
    }
  }

  return (
    <DataContext.Provider 
    value={{ 
      orders, 
      customers, 
      categories, 
      categoryItems, 
      categoryClickHandler,
       brands, 
       brandItems,
       brandsClickHandler,
       isBrandsLoading,
       isCategoriesLoading,
       isItemsLoading
      
        }}>
      {children}
    </DataContext.Provider>
  );
};


