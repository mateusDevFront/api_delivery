import path from "node:path";

import { Router } from "express";
import multer from "multer";

import { ListCategories } from "./app/useCases/categories/listCategories";
import { CreateCategory } from "./app/useCases/categories/createCategory";
import { ListProducts } from "./app/useCases/products/listProducts";
import { CreateProduct } from "./app/useCases/products/createProduct";
import { ListProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { ListOrders } from "./app/useCases/orders/listOrders";
import {CreateOrder} from './app/useCases/orders/createOrder'
import {ChangeOrderStatus} from './app/useCases/orders/changeOrderStatus'
import {CancelOrder} from './app/useCases/orders/cancelOrder'

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "../", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

//listar categorias
router.get("/categories", ListCategories);

// criar categoria
router.post("/categories", CreateCategory);

// listar produtos
router.get("/products", ListProducts);

// Criar produtos
router.post("/products", upload.single("image"), CreateProduct);

// Buscar um produto baseadn na categoria
router.get("/categories/:categoryId/products", ListProductsByCategory);

// Listar pedidos
router.get("/orders", ListOrders);

// Criar perdido
router.post("/orders", CreateOrder);

// Status do pedido
router.patch("/orders/:orderId", ChangeOrderStatus);
// Deletar/cancelar um pedido
router.delete("/orders/:orderId", CancelOrder);
