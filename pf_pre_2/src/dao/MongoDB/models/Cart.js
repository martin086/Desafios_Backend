import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2"

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
    }
    //paginate
}

export default ManagerCartMongoDB