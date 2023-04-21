import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const routerProducts = Router()

routerProducts.get("/", getProducts)
routerProducts.get("/:pid", getProduct)
routerProducts.post("/", createProduct)
routerProducts.put("/:pid", updateProduct)
routerProducts.delete("/:pid", deleteProduct)


export default routerProducts;
