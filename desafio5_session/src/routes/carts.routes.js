import { Router } from "express";
import { addProductCart, createCart, emptyCart, getCart, removeProductCart, updateAllCart, updateProdQtyCart } from "../controllers/cart.controller.js";

const routerCart = Router()

routerCart.get('/:cid', getCart)
routerCart.post('/', createCart)
routerCart.post('/:cid/product/:pid', addProductCart)
routerCart.put('/:cid', updateAllCart)
routerCart.put('/:cid/product/:pid', updateProdQtyCart)
routerCart.delete('/:cid/product/:pid', removeProductCart)
routerCart.delete('/:cid', emptyCart)


export default routerCart;