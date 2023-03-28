import { ManagerMongoDB } from "../db/mongoDBManager.js";
import mongoose, { Schema } from "mongoose";

const url = process.env.URLMONGODB

const cartSchema = new mongoose.Schema({
    products: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products',
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


class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
    }
    async addProductCart(idCart, idProduct, quantity) {
        super.setConnection()
        try {
            //console.log("esto es el cart", idCart, " y esto es el prod", idProduct)
            const cart = await this.model.findById(idCart);
            cart.products.push({
                productId: idProduct,
                quantity: quantity
            })
            await cart.save()
            return cart
        } catch(error) {
            return error
        }
    }

    async getProductsCart() {
        super.setConnection()
        const prods = await this.model.find().populate("products.productId")
        return prods
    }

    async updateProdQty(idCart, idProduct, prodQty) {
        super.setConnection()
        //Get cart and check if product exists
        const cart = await this.model.findById(idCart).populate('products.productId');
        console.log("Cart actual: ", cart)
        const productIndex = cart.products.findIndex(
            product => {
                //console.log(product.productId.id)
                //console.log(idProduct)
                return product.productId.id === idProduct}) 
        if (productIndex === -1) throw new Error("Product not found in cart")

        try {
            let product = cart.products[productIndex];
            product.quantity = prodQty;
            await cart.save()
            return product;
        } catch(error) {
            return error
        }
    }

    async updateAllProducts(idCart, prodArray) {
        super.setConnection()
        try {
            const cart = await this.model.findById(idCart)//.populate('products.productId');
            cart.products = prodArray
            await cart.save()
            return cart.products
        } catch(error) {
            return error
        }
    }

    async deleteProductFromCart(idCart, idProduct) {
        super.setConnection();
        const cart = await this.model.findById(idCart).populate('products.productId');
        const productIndex = cart.products.findIndex(
            product => {
                return product.productId.id === idProduct})

        try {
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart.products;
        } catch(error) {
            return error
        }
    }

    async deleteAllProducts(idCart) {
        super.setConnection();
        
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