import { Router } from "express";
import { getManagerProducts } from "../dao/daoManager.js";

const routerProducts = Router()

const managerData = await getManagerProducts()
const productManager = new managerData()


routerProducts.get('/', async (req, res) => { 
    const { limit } = req.query; 
    console.log("Limit is: ", limit)
    let products
    !limit
        ? products = await productManager.getElements(10)
        : products = await productManager.getElements(limit)
        res.send({response: products})
})
  
routerProducts.get('/:id', async (req, res) => { 
    const product = await productManager.getElementById(req.params.id)
    if (product) {
        res.send({ response: product });
        console.log(product);
    } else {
        res.send({ Error: "id not found"})
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
    res.send(`Producto ${JSON.stringify(product)} eliminado.`)
});
  
routerProducts.put('/:id', async (req, res) => { 
    let product = await productManager.updateElement(req.params.id, req.body)
    res.send(`Producto ${JSON.stringify(product)} actualizado.`)
})

export default routerProducts;
