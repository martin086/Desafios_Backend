import passport from "passport"


export const registerUser = async (req, res, next) => {
    try {
        passport.authenticate('register', async (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: "Ha ocurrido un error con el registro.",
                    error: err.message })
            }
            if (!user) {
                return res.status(401).send("El usuario ya existe.")
            }
            return res.status(200).send("El usuario se ha registrado exitosamente.")
        })(req, res, next)
        
    } catch (error) {
        res.status(500).send({
            message: "Error en el servidor.",
            error: error.message
        })
    }
}

export const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('login', (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: "Ha ocurrido un error durante el login",
                    error: err.message
                })
            }
            if (!user) {
                return res.status(401).send("Correo electrónico o contraseña incorrecta")
            }
            req.session.login = true;
            req.session.user = user;
            return res.status(200).send(`Bienvenido ${req.session.user.first_name}, tu rol es ${req.session.user.role}`)
        })(req, res, next)

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor", 
            error: error.message
        })
    }

}


// export const checkLogin = async (req, res) => {
//     try {
        
//         const { email, password } = req.body

//         if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//             req.session.login = true
//             req.session.userFirst = "Admin Backend"
//             req.session.role = "admin"
//             console.log(`${email} logged in as ${req.session.role}`)
//             res.redirect('/products')
//         } else {
//             const user = await findUserByEmail(email)

//             if (user && validatePassword(password, user.password)) {
//                 req.session.login = true
//                 req.session.userFirst = user.first_name
//                 req.session.role = user.role
//                 console.log(`${email} logged in as ${user.role}`)
//                 res.redirect('/products')
//             } else {
//                 res.status(401).json({
//                     message: "Please check your credentials."
//                 })
//             }
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }


export const getSession = async (req, res) => {
    try {
        if (req.session.login) {
            const sessionData = {
                name: req.session.userFirst,
                role: req.session.role
            }
            return sessionData
        } else {
            res.redirect('/login', 500, { message: "Please Login" })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const destroySession = (req, res) => {
    try {
        if (req.session.login) {
            req.session.destroy()
            console.log(`Session closed`)
            res.status(200).redirect('/')
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const requireAuth = (req, res, next) => {
    console.log(req.session.login)
    req.session.login ? next() : res.redirect('/login')

}
