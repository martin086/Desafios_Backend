import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const routerSocket = Router();
const productManager = new ProductManager('src/models/productos.json')

routerSocket.get("/", async (req,res) => {
    const products = await productManager.getProducts()
    res.render("index", {products})
})

routerSocket.get("/realTimeProducts", async (req,res) => {
    const products = await productManager.getProducts()
    res.render("realTimeProducts", {products})
})

export default routerSocket