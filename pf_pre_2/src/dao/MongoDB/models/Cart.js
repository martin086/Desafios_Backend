import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    products: {
        type: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

cartSchema.plugin(paginate)


class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)

    }
    async addProductToCart(idCart, prodArray) {
        this._setConnection()
        const cart = await this.model.findById(idCart)
        const newProducts = prodArray
        try {
            cart.products = newProducts
            await cart.save()
            return cart.products
        } catch(error) {
            return error
        }
    }
    async updateProdQty(idCart, idProduct, prodQty) {
        await this._setConnection() // con el _ se pasa a protected
        
        const cart = await this.model.findById(idCart);
        const productIndex = cart.products.findIndex(product => product.productId === idProduct)

        try {
            let product = cart.products[productIndex];
            product.quantity = prodQty;
            await cart.save()
            return product;
        } catch(error) {
            return error
        }
    }

    async deleteProductFromCart(idCart, idProduct) {
        await this._setConnection();
        
        const cart = await this.model.findById(idCart);
        const productIndex = cart.products.findIndex(product => product.productId === idProduct)

        try {
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart.products;
        } catch(error) {
            return error
        }
    }

    async deleteAllProducts(idCart) {
        await this._setConnection();
        
        const cart = await this.model.findById(idCart);
        try {
            cart.products = [];
            await cart.save();
            return cart.products;
        } catch(error) {
            return error
        }
    }
}

export default ManagerCartMongoDB