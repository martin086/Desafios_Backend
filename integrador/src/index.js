import 'dotenv/config'
import express from 'express'
import socket from 'socket.io'
import { getManagerMessages } from './dao/daoManager'

const app = express()
const managerMessage = new getManagerMessages()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("port", process.env.PORT || 8080)

const server = app.listen(app.get("port", ()=> console.log(`Server on port ${app.get("port")}`)))

const io = socket(server)

io.on("connection", async (socket) => {
    socket.on("message", async (info) => {
        await managerMessage.addElements([info])
        const mensajes = await managerMessage.getElements()
        console.log(mensajes)
        socket.emit("allMessages", mensajes)
    })
})