import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { checkSessionRole, isSessionActive, Roles } from "../config/middlewares.js";

const routerProducts = Router()

routerProducts.get("/", isSessionActive, getProducts)
routerProducts.get("/:pid", isSessionActive, getProduct)
routerProducts.post("/", checkSessionRole(Roles.PREMIUM), createProduct)
routerProducts.put("/:pid", checkSessionRole(Roles.PREMIUM), updateProduct)
routerProducts.delete("/:pid", checkSessionRole(Roles.PREMIUM), deleteProduct)


export default routerProducts;
