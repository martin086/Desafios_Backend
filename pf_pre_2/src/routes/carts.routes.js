import { Router } from "express";
import { getManagerCart, getManagerProducts, getManagerUsers } from "../dao/daoManager.js";


const routerCart = Router()

const cartManagerData = await getManagerCart()
const cartManager = new cartManagerData()

const prodManagerData = await getManagerProducts()
const prodManager = new prodManagerData()

const userManagerData = await getManagerUsers()
const userManager = new userManagerData()


routerCart.get('/:cid', async (req, res) => { 
    const cart = await cartManager.getElementById(req.params.cid)
    res.send(cart)
})

routerCart.post('/', async (req, res) => { 
    const carrito = await cartManager.addElements()
    res.send(carrito)
})

routerCart.post('/:cid/products/:pid', async (req, res) => { 
    const prodQty = 1;
    const productData = await prodManager.getElementById(parseInt(req.params.pid));
    if (productData) {
        const data = await cartManager.addElements(parseInt(req.params.cid), parseInt(req.params.pid), prodQty)
        data ? res.send(`Producto ${productData.pid} agregado al carrito.`) : res.send(`Hubo un error al agregar el producto al carrito.`)
    } else {
        res.send(`El producto ${req.params.pid} no se ha encontrado.`)
    }
    
})
//Actualiza el carrito con un array de productos especificado.
routerCart.put('/:cid', async (req, res) => { 
    const prodQty = 1;
    const productData = await prodManager.getElementById(parseInt(req.params.pid));
    if (productData) {
        const data = await cartManager.updateElement(parseInt(req.params.cid), parseInt(req.params.pid), prodQty)
        data ? res.send(`Producto ${productData.id} agregado al carrito.`) : res.send(`Hubo un error al agregar el producto al carrito.`)
    } else {
        res.send(`El producto ${req.params.pid} no se ha encontrado.`)
    }
    
})
//Actualiza solo la cantidad del producto pasada por body.
routerCart.put('/:cid/products/:pid', async (req, res) => { 
    const prodQty = req.body;
    const productData = await prodManager.getElementById(parseInt(req.params.pid));
    if (productData) {
        const data = await cartManager.updateElement(parseInt(req.params.cid), parseInt(req.params.pid), prodQty)
        data ? res.send(`La cantidad de ${productData.id} ha sido actualizada.`) : res.send(`Hubo un error al agregar el producto al carrito.`)
    } else {
        res.send(`El producto ${req.params.pid} no se ha encontrado.`)
    }
    
})

//Elimina TODOS los productos contenidos en el carrito.
routerCart.delete('/:cid', async (req, res) => {
    let mensaje = await cartManager.deleteElement(req.params.cid) 
    res.send(mensaje)
})
//Elimina el proudcto seleccionado del carrito.
routerCart.delete('/:cid/products/:pid', async (req, res) => { 
    const cartData = await cartManager.getElementById(parseInt(req.params.cid));
    if (cartData) {
        const data = await cartManager.deleteElement(parseInt(req.params.cid), parseInt(req.params.pid))
        data ? res.send(`Producto ${req.params.pid} eliminado del carrito.`) : res.send(`Hubo un error al eliminar el producto del carrito.`)
    } else {
        res.send(`El producto ${req.params.pid} no se ha encontrado.`)
    }
    
})


export default routerCart;