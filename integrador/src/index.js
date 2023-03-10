import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import * as path from 'path'
import { __dirname } from "./path.js"
import { Server } from 'socket.io'
import { getManagerMessages } from './dao/daoManager.js'
import { engine } from 'express-handlebars'
import userModel from './dao/MongoDB/models/User.js'


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


const server = app.listen(app.get("port", ()=> console.log(`Server on port ${app.get("port")}`)))

//Socket.io
const io = new Server(server)

io.on("connection", async (socket) => {

    socket.on("message", async (info) => {
        await managerMessages.addElements([info])
        const messages = await managerMessages.getElements()
        console.log(messages)
        socket.emit("allMessages", messages)
    })
})


const main = async() => {
    await mongoose.connect("mongodb+srv://martinsuarez:coderhouse1234@cluster0.huzsazq.mongodb.net/?retryWrites=true&w=majority")
    // await userModel.create([
    //     {name: "Pepe", lastname: "Lepu", username: "Pepito01", email: "pepe@pepe.com", password: "123"},
    //     {name: "Firu", lastname: "Lais", username: "Firu01", email: "firu@firu.com", password: "123"}
    // ])
    //const response = await userModel.find().explain('executionStats')
    console.log(response)
}