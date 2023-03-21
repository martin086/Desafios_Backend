import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: Array,
        default: [""]
    }
})

productSchema.plugin(paginate)


export default class ManagerProductsMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
    }

}
