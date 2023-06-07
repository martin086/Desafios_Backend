//import { ManagerMongoDB } from "../db/mongoDBManager.js";
import { Schema, model } from "mongoose";
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
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        index: true
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
        required: true,
        index: true
    },
    thumbnail: {
        type: Array,
        default: []
    },
    owner: {
        type: String,
        default: 'admin'
    }
})

productSchema.plugin(paginate)

const productModel = model('premiumProducts', productSchema)

export default productModel