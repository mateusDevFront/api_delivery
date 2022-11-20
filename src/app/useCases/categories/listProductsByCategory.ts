import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function ListProductsByCategory(req: Request, res: Response) {
  try {
    const {categoryId} = req.params

    const produtcs = await Product.find().where('category').equals(categoryId)

    res.json(produtcs);
  } catch (error){
      console.log(error)
      res.sendStatus(500)
  }
}
