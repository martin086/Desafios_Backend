import { Router } from "express";
import { requireAuth } from "../controllers/session.controller.js";
import { renderProducts, viewCarts, viewLogin, viewProducts, viewRegister, viewChat, viewRecoverPassword, viewRecoveryEmailSent, viewResetPassword, viewResetPasswordSuccess } from "../controllers/view.controller.js";
import { recoverPassword, resetPassword } from "../controllers/user.controller.js";
import { checkSessionRole, isSessionActive } from "../config/middlewares.js";

const routerViews = Router()

routerViews.get('/', requireAuth, viewProducts)
routerViews.get('/login', viewLogin)
routerViews.get('/register', viewRegister)
routerViews.get('/products', isSessionActive, renderProducts)
routerViews.get('/carts/:cid', checkSessionRole("User"), viewCarts)
routerViews.get('/chat', viewChat)

//Password Recovery Routes
routerViews.get('/password/recover', viewRecoverPassword)
routerViews.post('/password/recover', recoverPassword)
routerViews.get('/password/recoveryEmailSent', viewRecoveryEmailSent)

routerViews.get('/password/reset', viewResetPassword)
routerViews.put('/password/reset', resetPassword)
routerViews.get('/password/resetSuccess', viewResetPasswordSuccess)

export default routerViews