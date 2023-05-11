import 'dotenv/config'
import './config/config.js'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { readMessages, createMessage } from './services/MessageService.js'
import * as path from 'path'
import { __dirname } from "./path.js"
import router from './routes/index.routes.js'
import MongoStore from 'connect-mongo'
import initializePassport from './config/passport.js'
import passport from 'passport'
import cors from 'cors'
import nodemailer from 'nodemailer'
import { read } from 'fs'
import { faker } from '@faker-js/faker';


// const whiteList = ['http://localhost:3000'] //Rutas validas a mi servidor

// const corsOptions = { //Reviso si el cliente que intenta ingresar a mi servidor esta o no en esta lista
//     origin: (origin, callback) => {
//         if (whiteList.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by Cors'))
//         }
//     }
// }


//Express Server
const app = express()

//Middlewares
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 90
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//Mongoose
const connectionMongoose = async () => {
    await mongoose.connect(process.env.URLMONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .catch((err) => console.log(err));
}

connectionMongoose()


//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Port
app.set("port", process.env.PORT || 8080)

//Handlebars
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, "./views"))
app.use('/', express.static(__dirname + '/public'))

//Routes
app.use('/', router)

//Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

//Nodemailer
let transporter = nodemailer.createTransport({ //Genero la forma de enviar info desde mail (o sea, desde Gmail con x cuenta)
    host: 'smtp.gmail.com', //Defino que voy a utilizar un servicio de Gmail
    port: 465,
    secure: true,
    auth: {
        user: "martinsuarezdev@gmail.com", //Mail del que se envia informacion
        pass: process.env.EMAIL_PASS,
        authMethod: 'LOGIN'
    }

})

app.get('/email', async (req, res) => {
    //console.log(process.env.EMAIL_PASS)
    await transporter.sendMail({
        from: 'Test Coder martinsuarezdev@gmail.com',
        to: "franciscopugh01@gmail.com",
        subject: "Saludos, nueva prueba",
        html: `
            <div>
                <h2>Hola, esta es una nueva prueba desde la clase de Coder</h2>
            </div>
        `,
        attachments: []
    })
    res.send("Email enviado")
})




//Launch
const server = app.listen(app.get("port"), ()=> console.log(`Server on port ${app.get("port")}`))

//Socket.io (Chat Server)
export const io = new Server(server);

io.on("connection", async (socket) => {
    console.log("Chat client online");

    socket.on("message", async newMessage => {
        await createMessage([newMessage]);
        const messages = await readMessages();
        console.log(messages)
        socket.emit("allMessages", messages)
    })

    socket.on("load messages", async () => {
        const messages = await readMessages()
        console.log(messages)
        socket.emit("allMessages", messages)
    })
})


//Faker /mockingproducts
// const products = []

// const createRandomProducts = () => {
//     return {
//         productId: faker.database.mongodbObjectId(),
//         code: faker.datatype.uuid(),
//         price: faker.commerce.price(50, 9000, 0, '$'),
//         title: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         stock: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
//         img: faker.image.transport()
//     };
// }

// for (let i = 0; i < 100; i++) {
//     products.push(createRandomProducts());
// }

// console.log(products)