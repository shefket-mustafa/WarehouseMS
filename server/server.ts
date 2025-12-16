import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { authRoutes } from "./routes/authRoutes.js";
import cors from "cors"
import { itemRoutes } from "./routes/inventoryItemRoutes.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

app.use("/auth",authRoutes);
app.use("/inventory", itemRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("API is running..")
})

mongoose.connect(MONGO_URI as string)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))
    
}).catch((error) => {
    console.log("Error connecting to DB: ", error);
    
})