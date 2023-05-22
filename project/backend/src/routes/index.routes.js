import { Router } from 'express'

import routerSession from "./sessions.routes.js";
import routerViews from "./views.routes.js";
import routerProduct from "./products.routes.js";
import routerCart from "./carts.routes.js";
//import routerSocket from "./socket.routes.js"
import routerUser from "./users.routes.js";
import routerGithub from "./github.routes.js";
import routerChat from './chat.routes.js';
import routerMockingProducts from './mockingProducts.routes.js';

const router = Router()

router.use('/', routerViews)
router.use('/api/products', routerProduct)
router.use('/api/carts', routerCart)
router.use('/user', routerUser)
router.use('/api/session', routerSession)
router.use('/api/chat', routerChat)
router.use('/mockingproducts', routerMockingProducts)
//router.use('/chat', routerSocket)
router.use('/authSession', routerGithub)
// router.use('*', (req,res) => {
//     res.status(404).send({error: "404 - Page not found"})
// })

export default router