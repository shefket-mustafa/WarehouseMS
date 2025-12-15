
import { createContext, useContext } from "react";
import type { InventoryItem } from "../data/DataContext";

export type inventoryContextTypes = {
    addItem: (data: InventoryItem) => Promise<Response>
}


export const InventoryContext = createContext<inventoryContextTypes | undefined>(undefined);

export const useInventory = () => {
    const context = useContext(InventoryContext);

    if(context === undefined){
        throw new Error("useInventory must be used in InventoryProvider")
    }

    return context
}