import { useEffect, useState, type ReactNode } from "react";
import { InventoryContext } from "./inventory-context-hook";
import type { InventoryItem } from "../data/DataContext";

export const InventoryProvider = ({children}: {children: ReactNode}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [allItems, setAllItems] = useState<InventoryItem[]>([]);

        const addItem = async (data: InventoryItem) => {

            console.log(BASE_URL);
            const res = await fetch(`${BASE_URL}/inventory/addItems`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(res);
            return res
        }

        useEffect(() => {

           fetch(`${BASE_URL}/inventory/getItems`, {
            method: "GET",
            headers: {"Content-Type":"application/json"}
           }).then((data) => data.json())
           .then((data) => {
            console.log(data);
            setAllItems(data)
            
           })
           
                
                
            
        },[])
      

    return(
        <InventoryContext.Provider value={{addItem, allItems}}>
            {children}

        </InventoryContext.Provider>
    )
}  