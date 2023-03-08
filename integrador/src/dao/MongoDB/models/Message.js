import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB //consulto la url desde las variables de entorno

const messageSchema = new Schema({
    nombre: String,
    email: {
        type: String,
        unique: true
    },
    message: String
})

export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "messages", messageSchema)
        //Acá van los atributos propios de la clase
    }
    //Acá van los métodos propios de la clase
}