import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function ListProducts(req: Request, res: Response) {
  try {
    const produtcs = await Product.find();

    res.json(produtcs);
  } catch {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
}
