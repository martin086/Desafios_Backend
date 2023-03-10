import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";
import { getManagerProducts } from "../dao/daoManager.js";
import { ManagerProductMongoDB } from "../dao/MongoDB/models/Product.js";

const routerProducts = Router()
//const productManager = new ProductManager('src/models/productos.json')
const productManager = new getManagerProducts()


routerProducts.get('/', async (req, res) => { 
    const { limit } = req.query; 
    console.log("Limit is: ", limit)
    let products
    !limit
        ? products = await productManager.getElements(0)
        : products = await productManager.getElements(limit)
        res.send({response: products})
})
  
routerProducts.get('/:id', async (req, res) => { 
    const product = await productManager.getElementById(req.params.id)
    if (product) {
        res.send(JSON.stringify(product));
        console.log(product);
    } else {
        res.json({ Error: "id not found"})
    }    
})
  
routerProducts.post('/', async (req, res) => {
    try {
        const info = req.body;
        let product = await productManager.addElements(info);
        res.send({response: product})
    } catch (error) {
        res.send(error)
    } 
    
});
  
routerProducts.delete('/:id', async (req, res) => {
    let product = await productManager.deleteElement(req.params.id) 
    res.send(`Producto ${JSON.stringify(product)} eliminado`)
});
  
routerProducts.put('/:id', async (req, res) => { 
    let product = await productManager.updateElement(req.params.id, req.body)
    res.send(JSON.stringify(product))
})

export default routerProducts;
