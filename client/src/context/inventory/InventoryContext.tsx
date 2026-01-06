import { useEffect, useState, type ReactNode } from "react";
import { InventoryContext } from "./inventory-context-hook";
import type { DashboardItem, InventoryFormInput } from "../data/DataContext";

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [allItems, setAllItems] = useState<DashboardItem[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const token = localStorage.getItem("token");

  const addItem = async (data: InventoryFormInput) => {
    console.log(BASE_URL);
    const res = await fetch(`${BASE_URL}/inventory/addItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`
      },
      
      body: JSON.stringify(data),
    });
    
    await fetchItems();
    return res;
  };

  const fetchItems = async () => {
    setIsDataLoading(true);
    try{
      const res = await fetch(`${BASE_URL}/inventory/getItems`, {
        headers: {"Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) {
        console.log(res);
      }
      console.log(res);
  
      const data = await res.json();
      setAllItems(data);
    }finally{
      setIsDataLoading(false)
    }
  };

  useEffect(() => {
    fetchItems()
  },[])

  return (
    <InventoryContext.Provider value={{ addItem, allItems, isDataLoading }}>
      {children}
    </InventoryContext.Provider>
  );
};
