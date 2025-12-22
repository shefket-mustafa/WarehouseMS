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

itemRoutes.get("/categories", async(req: Request, res: Response) => {

    try{
        const categories = await InventoryModel.aggregate([

            {
                $group: {
                    _id: "$category",
                    itemCount: {$sum: 1}
                },
            },

            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    itemCount: 1
                },
            },

            {
                $sort: {name: 1}
            }
        ])

        return res.json(categories);
    }catch(err){
        return res.status(500).json({message: "Internal server error!"})
    }
})

itemRoutes.get("/brands", async(req: Request, res: Response) => {

    try{
        const brands = await InventoryModel.aggregate([

            {
                $group: {
                    _id: "$brand",
                    itemCount: {$sum: 1}
                },
            },

            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    itemCount: 1
                },
            },

            {
                $sort: {name: 1}
            }
        ])

        return res.json(brands);
    }catch(err){
        return res.status(500).json({message: "Internal server error!"})
    }
})

itemRoutes.get("/categories/:category", async(req: Request, res: Response) => {

    try{

        const {category} = req.params;

        if(!category){
            return res.status(400).json({message: "Category is required!"})
        }
        
        const categoryItems = await InventoryModel.find({category})

        return res.json(categoryItems)


    }catch(err){
        return res.status(500).json({message: "Internal server error!"})
    }
})

itemRoutes.get("/brands/:brand", async(req: Request, res: Response) => {

    try{

        const {brand} = req.params;

        if(!brand){
            return res.status(400).json({message: "Brand is required!"})
        }
        
        const brandItems = await InventoryModel.find({brand})

        return res.json(brandItems)


    }catch(err){
        return res.status(500).json({message: "Internal server error!"})
    }
})

// itemRoutes.patch("/editItems", async(req:Request, res:Response) => {

//     try{
//         const whatToEdit = req.body;


//     }catch(err){
//         return res.status(500).json({message: "Internal server error!"})
//     }
// })
