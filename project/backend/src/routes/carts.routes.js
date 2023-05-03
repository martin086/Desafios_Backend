import { Router } from "express";
import { addProductToCart, createNewCart, emptyCart, getCart, removeProductCart, updateAllCart, updateProdQtyCart, createNewPurchase } from "../controllers/cart.controller.js";

const routerCart = Router()

routerCart.get('/:cid', getCart)
//routerCart.post('/', createNewCart) Eliminamos la ruta porque ahora se crea con el usuario.
routerCart.post('/:cid/products/:pid', addProductToCart)
routerCart.post('/:cid/purchase', createNewPurchase)
routerCart.put('/:cid', updateAllCart)
routerCart.put('/:cid/products/:pid', updateProdQtyCart)
routerCart.delete('/:cid/products/:pid', removeProductCart)
routerCart.delete('/:cid', emptyCart)


export default routerCart;