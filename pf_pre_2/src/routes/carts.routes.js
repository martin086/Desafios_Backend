import { Router } from "express";
import { getManagerCart, getManagerProducts, getManagerUsers } from "../dao/daoManager.js";
import ManagerCartMongoDB from "../dao/MongoDB/models/Cart.js";

const routerCart = Router()

const cartManagerData = await getManagerCart()
const cartManager = new cartManagerData()

const prodManagerData = await getManagerProducts()
const prodManager = new prodManagerData()

//const userManagerData = await getManagerUsers()
//const userManager = new userManagerData()

//Get Carts and populate
routerCart.get('/:cid', async (req, res) => { 
    const cart = await cartManager.getElementById(req.params.cid)//.populate()
    res.send(cart)
})
//Create Cart (Postman only)
routerCart.post('/', async (req, res) => { 
    const cart = await cartManager.addElements()
    res.send(cart)
})

//Agrega un producto o un array de productos específico al carrito
routerCart.put('/:cid', async (req, res) => { 
    try {
        const cartData = await cartManager.getElementById((req.params.cid));
        const prodArray = req.body

        const addedProducts = await ManagerCartMongoDB.addProductToCart(cartData, prodArray)

        res.send({
            status: "success",
            payload: addedProducts
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})

//Actualiza solo la cantidad del producto pasada por body.
routerCart.put('/:cid/products/:pid', async (req, res) => { 
    try {
        const prodQty = parseInt(req.body);
        const productData = await prodManager.getElementById((req.params.pid));
        const cartData = await cartManager.getElementById((req.params.cid));

        const updatedProduct = await ManagerCartMongoDB.updateProdQty(cartData, productData, prodQty);

        res.send({
            status: "success",
            payload: updatedProduct
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})

//Elimina TODOS los productos contenidos en el carrito.
routerCart.delete('/:cid', async (req, res) => {
    try {
        const cartData = await cartManager.getElementById((req.params.cid))
        const emptyCart = await ManagerCartMongoDB.deleteAllProducts(cartData)

        res.send({
            status: "success",
            payload: emptyCart
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})
//Elimina el producto seleccionado del carrito.
routerCart.delete('/:cid/products/:pid', async (req, res) => { 
    try {
        const cartData = await cartManager.getElementById((req.params.cid))
        const productData = await prodManager.getElementById((req.params.pid))

        const updatedCart = await ManagerCartMongoDB.deleteProductFromCart(cartData, productData)

        res.send({
            status: "success",
            payload: updatedCart
        })
    
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }    
})


export default routerCart;