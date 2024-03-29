import passport from "passport";
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt';
import { userManager } from "../controllers/user.controller.js";
import { createHash, validatePassword } from "../utils/bcrypt.js";

//Passport se maneja como un middleware.
const LocalStrategy = local.Strategy //Estrategia local de auth.
//Passport define done como si fuera un res.status()

const JWTStrategy = jwt.Strategy //Estrategia de JWT
const ExtractJWT = jwt.ExtractJwt //Extractor de headers o cookies

const initializePassport = () => {
    
    const cookieExtractor = (req) => {
        //Si existen cookies en el browser, verifico si existe la cookie de JWT. Si no, asigno null.
        const token = (req && req.cookies) ? req.cookies('jwtCookies') : null
                                            //Si no existe, undefined.
        return token
        
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //De donde extraigo mi token
        secretOrKey: process.env.SIGNED_COOKIE
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
    
    //Ruta a implementar
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            //Validar y crear Usuario
            const { first_name, last_name, email } = req.body
            try {
                const user = await userManager.getElementByEmail(username) //Username = email

                if (user) { //Usario existe
                    return done(null, false) //null que no hubo errores y false que no se creo el usuario

                }

                const passwordHash = createHash(password)

                const userCreated = await userManager.addElements([{
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: passwordHash
                }])

                return done(null, userCreated) //Usuario creado correctamente

            } catch (error) {
                return done(error)
            }

        }

    ))
    
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await userManager.getElementByEmail(username)

            if (!user) { //Usuario no encontrado
                return done(null, false)
            }
            if (validatePassword(password, user.password)) { //Usuario y contraseña validos
                return done(null, user)
            }

            return done(null, false) //Contraseña no valida

        } catch (error) {
            return done(error)
        }
    }))

    //GitHub Auth Strategy
    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/authSession/githubSession'
    }, async(accesToken, refreshToken, profile, done) => {

        try {
            console.log(profile)
            const user = await userManager.getElementByEmail(profile._json.email)

            if(user) { //Usuario ya existe en BDD (ya se logueó antes)
                done(null, user)
            } else {
                const passwordHash = createHash('coder123')
                const userCreated = await userManager.addElements([{
                    first_name: profile._json.name,
                    last_name: ' ',
                    email: profile._json.email,
                    password: passwordHash //Contraseña por default
                }])

                done(null, userCreated)
            }
        } catch (error) {
            return done(error)
        }
    }))
    


    //Iniciar la session del usuario
    passport.serializeUser((user, done) => {
        if (Array.isArray(user)) {
            done(null, user[0]._id)
        } else {
            done(null, user._id)
        }
        
    })
    //Eliminar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getElementById(id)
        done(null, user)

    })

}

export default initializePassport
