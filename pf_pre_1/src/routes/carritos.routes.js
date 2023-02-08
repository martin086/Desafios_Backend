import { Router } from "express";
import { CartManager } from "../controllers/CartManager.js";
const routerCart = Router()
const cartManager = new CartManager('src/models/carrito.json')


routerCart.get('/:cid', async (req, res) => { 
    const carrito = await cartManager.getCartById(req.params.id)
    console.log(carrito)
    res.send(JSON.stringify(carrito))
})

routerCart.post('/', async (req, res) => { 
    let mensaje = await cartManager.addCart(req.body)
    res.send(mensaje)
})

routerCart.post('/:cid/product/:pid', async (req, res) => { 
    let mensaje = await cartManager.updateCart(req.body)
    res.send(mensaje)
})
/* NO SE PIDEN
routerCart.delete('/:id', async (req, res) => {
    let mensaje = await cartManager.deleteProduct(req.params.id) 
    res.send(mensaje)
})

routerCart.put('/:id', async (req, res) => { 
    let mensaje = await cartManager.updateProduct(req.params.id, req.body)
    res.send(mensaje)
})
*/
export default routerCart