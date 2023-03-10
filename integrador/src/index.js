import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import * as path from 'path'
import { __dirname } from "./path.js"
import { Server } from 'socket.io'
import { getManagerMessages } from './dao/daoManager.js'
import { engine } from 'express-handlebars'
import userModel from './dao/MongoDB/models/User.js'
import routerProducts from './routes/productos.routes.js'
import routerSocket from './routes/socket.routes.js'


//Express Server
const app = express()
const managerMessages = getManagerMessages()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Port
app.set("port", process.env.PORT || 8080)

//Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, "./views"))

//Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', routerSocket)
app.use('/realtimeproducts', routerSocket)
//app.use('/api/products', routerProduct)
//app.use('/api/carts', routerCart)
app.use('/chat', routerSocket)


const server = app.listen(app.get("port", ()=> console.log(`Server on port ${app.get("port")}`)))

//Socket.io
const io = new Server(server)

io.on("connection", async (socket) => {
    console.log("Client connected");

    socket.on("message", async (info) => {
        await managerMessages.addElements([info]).then(() => {
            managerMessages.getElements().then((messages) => {
                socket.emit("allMessages", messages);
            })
        })
    })
})


// const main = async() => {
//     await mongoose.connect(process.env.URLMONGODB)
//     // await userModel.create([
//     //     {name: "Pepe", lastname: "Lepu", username: "Pepito01", email: "pepe@pepe.com", password: "123"},
//     //     {name: "Firu", lastname: "Lais", username: "Firu01", email: "firu@firu.com", password: "123"}
//     // ])
//     //const response = await userModel.find().explain('executionStats')
//     console.log(response)
// }