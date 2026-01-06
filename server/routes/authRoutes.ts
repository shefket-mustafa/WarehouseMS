import { Router } from "express";
import type { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/postgres.js";

export const authRoutes = Router();

authRoutes.post("/register", async (req: Request, res: Response) => {
  const { companyName, email, password } = req.body;
  const SECRET = process.env.JWT_SECRET;

  const client = await pool.connect();

  try {
    //starting the transaction
    await client.query("BEGIN");

    //Check for existing company
    const companyExists = await client.query(
      "SELECT id FROM companies WHERE name = $1",
      [companyName]
    );

    if (companyExists.rows.length > 0) {
      throw new Error("Company already exists!");
    }

    //Checking for user
    const userExists = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      throw new Error("User already exists!");
    }

    //Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Inserting the company if all is ok
    const companyResult = await client.query(
      "INSERT INTO companies (name) VALUES ($1) RETURNING id",
      [companyName]
    );

    const companyId = companyResult.rows[0].id;

    //Inserting the user if all is ok
    await client.query(
      "INSERT INTO users (email, password_hash, company_id) VALUES ($1, $2, $3)",
      [email, hashedPassword, companyId]
    );

    //Committing transaction
    await client.query("COMMIT");

    //JWT
    const token = jwt.sign({ companyId }, SECRET as string, {
      expiresIn: "1d",
    });

    res
      .status(201)
      .json({ message: "User registered successfully!", token, companyName });
  } catch (err: unknown) {
    //If something fails we undo everything go back to before BEGIN
    await client.query("ROLLBACK");

    if (err instanceof Error) {
      if (err.message === "Company already exists!") {
        return res
          .status(400)
          .json({ message: "Company is already registered!" });
      }

      if (err.message === "User already exists!") {
        return res.status(400).json({ message: "User already exists!" });
      }
    }

    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  } finally {
    //need to always release the client so that it can return to the pool
    client.release();
  }
});

authRoutes.post("/login", async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const SECRET = process.env.JWT_SECRET;

    try{

      
      const userExists = await pool.query(
        "SELECT id, password_hash, company_id FROM users WHERE email = $1", [email]
      );
      if(userExists.rows.length === 0){
        return res.status(400).json({message: "User not found!"})
      }
      
      const isPasswordValid = await bcrypt.compare(password, userExists.rows[0].password_hash);
      
      if(!isPasswordValid){
        return res.status(400).json({ message: "Invalid credentials!" });
      }
      
      const token = jwt.sign({companyId:userExists.rows[0].company_id}, SECRET as string, {expiresIn: "1d"});
      
      return res.json({token, email})
      
    }catch(err: unknown){
      if(err instanceof Error){
        console.error("Login error:", err);
      }
    return res.status(500).json({ message: "Server error" });
    }
  })