import { Request, Response, Router } from "express";
import { InventoryModel } from "../model/InventoryItem.js";
import generateCode from "../lib/helpers.js";
import pool from "../db/postgres.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const itemRoutes = Router();

itemRoutes.get(
  "/getItems",
  authMiddleware,
  async (req: Request, res: Response) => {
    const companyId = res.locals.companyId;

    const items = await pool.query(
      "SELECT * FROM inventory_items WHERE company_id = $1",
      [companyId]
    );

    return res.json(items.rows || []);
  }
);

itemRoutes.post(
  "/addItems",
  authMiddleware,
  async (req: Request, res: Response) => {
    const companyId = res.locals.companyId;

    try {
      const {
        product_name,
        category,
        sub_category,
        size,
        barcode,
        quantity,
        brand,
        price,
      } = req.body;

      const result = await pool.query(
        "INSERT INTO inventory_items(code,  product_name, category, sub_category, size, barcode, quantity, brand, price, company_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        [generateCode(), product_name, category, sub_category, size, barcode, quantity, brand, price, companyId]
      );

      return res.json({
        message: "Item added successfully",
        item: result.rows[0],
      });
    } catch (err) {
         console.error(err);
      return res.status(500).json({ message: "Failed to add item!" });
    }
  }
);

itemRoutes.get(
  "/categories",
  authMiddleware,
  async (req: Request, res: Response) => {
    const companyId = res.locals.companyId;
    try {
      const categories = await pool.query(
        `SELECT category AS name, COUNT(*)::int AS "itemCount"
        FROM inventory_items WHERE company_id = $1 GROUP BY category ORDER BY category`,
        [companyId]
      );

      return res.json(categories.rows || []);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }
);

itemRoutes.get(
  "/brands",
  authMiddleware,
  async (req: Request, res: Response) => {
    const companyId = res.locals.companyId;

    try {
      const brands = await pool.query(
        `SELECT brand AS name, COUNT(*)::int AS "itemCount"
        FROM inventory_items WHERE company_id = $1 GROUP BY brand ORDER BY brand`,
        [companyId]
      );

      return res.json(brands.rows || []);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }
);

itemRoutes.get(
  "/categories/:category",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { category } = req.params;
    const companyId = res.locals.companyId;

    try {
      const result = await pool.query(
        "SELECT code, product_name, brand, category, quantity FROM inventory_items WHERE company_id = $1 AND category = $2",
        [companyId, category]
      );

      if (result.rows.length === 0) {
        return res.json([]);
      }

      return res.json(result.rows);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }
);

itemRoutes.get(
  "/brands/:brand",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { brand } = req.params;
    const companyId = res.locals.companyId;

    try {
      const brandExists = await pool.query(
        "SELECT code, product_name, brand, category, quantity FROM inventory_items WHERE company_id = $1 AND brand = $2",
        [companyId, brand]
      );
      if (brandExists.rows.length === 0) {
        return res.status(400).json({ message: "Brand is required!" });
      }

      return res.json(brandExists.rows || []);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
  }
);
