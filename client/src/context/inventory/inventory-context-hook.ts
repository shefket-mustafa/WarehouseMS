
import { createContext, useContext } from "react";
import type { DashboardItem, InventoryFormInput } from "../data/DataContext";

export type inventoryContextTypes = {
    addItem: (data: InventoryFormInput) => Promise<Response>
    allItems: DashboardItem[];
    isDataLoading: boolean
}


export const InventoryContext = createContext<inventoryContextTypes | undefined>(undefined);

export const useInventory = () => {
    const context = useContext(InventoryContext);

    if(context === undefined){
        throw new Error("useInventory must be used in InventoryProvider")
    }

    return context
}