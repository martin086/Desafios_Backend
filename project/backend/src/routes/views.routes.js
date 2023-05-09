import { Router } from "express";
import { requireAuth } from "../controllers/session.controller.js";
import { renderProducts, viewCarts, viewLogin, viewProducts, viewRegister, viewChat } from "../controllers/view.controller.js";
import { checkSessionRole, isSessionActive } from "../config/middlewares.js";

const routerViews = Router()

routerViews.get('/', requireAuth, viewProducts)
routerViews.get('/login', viewLogin)
routerViews.get('/register', viewRegister)
routerViews.get('/products', isSessionActive, renderProducts)
routerViews.get('/carts/:cid', checkSessionRole("User"), viewCarts)
routerViews.get('/chat', viewChat)

export default routerViews