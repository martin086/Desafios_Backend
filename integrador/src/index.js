import 'dotenv/config'
import express from 'express'
import * as path from 'path'
import { __dirname } from "./path.js"
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { getManagerMessages } from './dao/daoManager.js'
import routerProducts from './routes/products.routes.js'
import routerSocket from './routes/socket.routes.js'


//Express Server
const app = express()

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
app.use('/api/products', routerProducts)
//app.use('/api/carts', routerCart)
app.use('/chat', routerSocket)


//Launch
const server = app.listen(app.get("port", ()=> console.log(`Server on port ${app.get("port")}`)))

//Socket.io
const io = new Server(server);

const data = await getManagerMessages();
const managerMessages = new data.ManagerMessageMongoDB;
//let messagesArr = [];

io.on("connection", async (socket) => {
    console.log("Client connected");

    socket.on("message", async (info) => {
        await managerMessages.addElements([info])
        const message = await managerMessages.getElements()
        console.log(message)
        io.emit("allMessages", message)
    })

    socket.on("load messages", info => {
        console.log(messages)
        io.emit("allMessages", info)
    })

})