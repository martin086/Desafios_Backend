import { Router } from "express";
import { getManagerProducts } from "../dao/daoManager.js";

const routerProducts = Router()

const managerData = await getManagerProducts()
const productManager = new managerData()


routerProducts.get('/', async (req, res) => {
    //Links para previous y next page
    //const prevLink = productsPaginated.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&available=${available}&page=${page - 1}` : null
    //const nextLink = productsPaginated.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&available=${available}&page=${page - 1}` : null
 
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
        let response = await productManager.addElements(info);
        res.send({
            status: "success",
            payload: response,
        });
    } catch (error) {
        res.send({
            status: "error",
            payload: error,
        });
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
