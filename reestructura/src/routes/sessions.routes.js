import { Router } from "express";
import { destroySession, getSession, loginUser, registerUser } from "../controllers/session.controller.js";
// import passport from "passport";
// import { passportError, roleVerification } from "../utils/errorMessages.js";

const routerSession = Router()

routerSession.post('/register', registerUser)
routerSession.post('/login', loginUser)

routerSession.get('/logout', destroySession)
routerSession.get('/current', getSession)


// Rutas con JWT
// routerSession.get('testJWT', passport.authenticate('jwt', {session: false}, (req, res) => {
//     res.send({"message": "tokenJWT"})
// }))
// routerSession.get("/current", passportError('jwt'), roleVerification('Admin'), (req,res) => {
//     res.send(req.user)
// })

export default routerSession