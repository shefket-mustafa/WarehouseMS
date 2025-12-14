import { Router } from "express";
import type { Response, Request } from "express";
import { UserModel } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authRoutes = Router();

authRoutes.post("/register", async (req: Request, res: Response) => {
  const SECRET = process.env.JWT_SECRET;
  console.log(SECRET);
  

  try {
    const { companyName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User is already registered!" });
    }

    const existingCompany = await UserModel.findOne({ companyName });
    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company is already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      companyName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({companyName}, SECRET as string, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .json({ message: "User registered successfully", token, companyName });
  } catch (err) {
      console.error("Error in /register:", err);
    res.status(500).json({ message: "Server error" });
  }
});

authRoutes.post("/login", async (req: Request, res: Response) => {
const SECRET = process.env.JWT_SECRET;
console.log(SECRET);

  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

   const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(400).json({message: "Invalid credentials!"})
    }

    const companyName = user.companyName
    const token = jwt.sign({companyName}, SECRET as string, {expiresIn: "1d"});
    res.json({token, companyName, email})
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

