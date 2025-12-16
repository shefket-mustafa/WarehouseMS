import { Request, Response, Router } from "express";
import { InventoryModel } from "../model/InventoryItem.js";

export const itemRoutes = Router();

itemRoutes.get("/getItems", async(req: Request, res: Response) => {

    const items = await InventoryModel.find();

    return res.json(items)
})

itemRoutes.post("/addItems", async (req: Request, res: Response) => {
  
try{
    const createdItem =  await InventoryModel.create(req.body);

    return res.json({message: "Item added successfully", item: createdItem})

}catch(err){
    return res.status(500).json({message: "Internal server error!"})
}
});

// itemRoutes.patch("/editItems", async(req:Request, res:Response) => {

//     try{
//         const whatToEdit = req.body;


//     }catch(err){
//         return res.status(500).json({message: "Internal server error!"})
//     }
// })
