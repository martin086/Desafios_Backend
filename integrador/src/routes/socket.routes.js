import { Router } from "express";
//import { ProductManager } from "../controllers/ProductManager.js";
import { getManagerMessages, getManagerProducts } from "../dao/daoManager.js";


const routerSocket = Router();
//const productManager = new ProductManager('src/models/productos.json')
const productManager = new getManagerProducts()
const msgManager = new getManagerMessages()


routerSocket.get("/", async (req,res) => {
    const products = await productManager.getElements()
    res.render("index", {products})
})

routerSocket.get("/realtimeproducts", async (req,res) => {
    const products = await productManager.getElements()
    res.render("realTimeProducts", {
        products: products
    })
})

routerSocket.get("/chat", async (req,res) => {
    const messages = await msgManager.getElements()
    res.render("chat", {messages})
})


export default routerSocket
