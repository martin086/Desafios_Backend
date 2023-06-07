import { Router } from "express";
import { addProductToCart, createNewCart, emptyCart, getCart, removeProductCart, updateAllCart, updateProdQtyCart, createNewPurchase } from "../controllers/cart.controller.js";
import { checkSessionRole, Roles } from "../config/middlewares.js";

const routerCart = Router()


routerCart.get('/:cid', checkSessionRole(Roles.USER), getCart)
//routerCart.post('/', createNewCart) Eliminamos la ruta porque ahora se crea con el usuario.
routerCart.post('/:cid/products/:pid', checkSessionRole(Roles.USER), addProductToCart)
routerCart.post('/:cid/purchase', checkSessionRole(Roles.USER), createNewPurchase)
//routerCart.put('/:cid', updateAllCart)
routerCart.put('/:cid/products/:pid', checkSessionRole(Roles.USER), updateProdQtyCart)
routerCart.delete('/:cid/products/:pid', checkSessionRole(Roles.USER), removeProductCart)
routerCart.delete('/:cid', checkSessionRole(Roles.USER), emptyCart)


export default routerCart;