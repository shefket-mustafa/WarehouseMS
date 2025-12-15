import type { ReactNode } from "react";
import { InventoryContext } from "./inventory-context-hook";
import type { InventoryItem } from "../data/DataContext";

export const InventoryProvider = ({children}: {children: ReactNode}) => {

        const addItem = async (data: InventoryItem) => {

            const BASE_URL = import.meta.env.VITE_BASE_URL;
            console.log(BASE_URL);
            const res = await fetch(`${BASE_URL}/inventory/addItems`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(res);
            return res
        }

    return(
        <InventoryContext.Provider value={{addItem}}>
            {children}

        </InventoryContext.Provider>
    )
}  