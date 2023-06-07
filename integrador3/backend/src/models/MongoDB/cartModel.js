import { Schema, model } from "mongoose";


const cartSchema = new Schema({
    products: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Products',
                required: true
                },
            quantity: {
                type: Number,
                default: 1
                }
            }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const cartModel = model('premiumCarts', cartSchema)

export default cartModel