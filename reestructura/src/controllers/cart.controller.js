import { findCartById, createCart, updateCart } from "../services/CartService.js";
import { findProductById } from "../services/ProductService.js";
import productModel from "../models/MongoDB/productModel.js";


//Get specified Cart and populate
export const getCart = async (req, res) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;

        try {
            const cart = await findCartById(idCart);
            if(!cart) {
                throw new Error("Carrito inexistente.");
            }

            const popCart = await cart.populate({ 
                path: "products.productId", model: productModel})
            res.status(200).json({ popCart })
        } catch (error) {
            res.status(500).send({
                message: "Error en el servidor.",
                error: error.message
            })
        }

    } else {
        return res.status(401).send("No existe sesion activa.")
    }
    
}

//Create New Cart
export const createNewCart = async (req, res) => {
    try {
        const cart = {}
        const newCart = await createCart(cart)
        res.send({
            status: "success",
            payload: newCart
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error.message
        })
    }
}

//Add a product to Cart
export const addProductToCart = async (req, res) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;
        const idProduct = req.params.pid;
        
        try {
            const existingProduct = await findProductById(idProduct);

            if (existingProduct) {
                const cart = await findCartById(idCart);
                const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

                if (productIndex === -1) {
                    cart.products.push({ productId: idProduct });
                } else {
                    cart.products[productIndex].quantity += 1;
                }

                await cart.save();
                return res.status(200).send("Producto agregado al carrito.")
            }

        } catch (error) {
            res.status(500).send({
                message: "Error en el servidor.",
                error: error.message
            })
        }

    } else {
        return res.status(401).send("No existe sesión activa.")
    }
}
    
//Add an array of products to the cart
export const updateAllCart = async (req, res) => {
    try {
        const prodArray = req.body
        const addedProducts = await cartManager.updateAllProducts(req.params.cid, prodArray)

        res.send({
            status: "success",
            payload: addedProducts
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }

}
//Update only the quantity of a single product.
export const updateProdQtyCart = async (req, res) => {
    if (req.session.login) {
        const { quantity } = req.body;
        const idCart = req.session.user.idCart;
        const idProduct = req.params.pid;
        const newQty = parseInt(quantity);

        try {
            const cart = await findCartById(idCart);
            const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

            if (productIndex === -1) {
                throw new Error("El producto no se encuentra en el carrito.");
            }

            cart.products[productIndex].quantity = newQty;
            await cart.save();
            return res.status(200).send("Producto actualizado.")

        } catch (error) {   
            res.status(500).send({
                message: "Error en el servidor.",
                error: error.message
            })
        }

    } else {
        return res.status(401).send("No existe sesión activa.")
    }
}
    
//Elimina el producto seleccionado del carrito.
export const removeProductCart = async (req, res) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;
        const idProduct = req.params.pid;

        try {
            const cart = await findCartById(idCart);
            const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

            if (productIndex === -1) {
                throw new Error("El producto no se encuentra en el carrito.");
            }

            cart.products.splice(productIndex, 1);
            await cart.save();
            return res.status(200).send("Producto eliminado del carrito.")


        } catch (error) {
            res.status(500).send({
                message: "Error en el servidor.", 
                error: error.message
            })
        }

    } else {
        return res.status(401).send("No existe sesion activa.")
    }

}
//Remove all products from cart.
export const emptyCart = async (req, res) => {
    if (req.session.login) {
        const idCart = req.session.user.idCart;

        try {
            await updateCart(idCart, { products: [] });
            return res.status(200).send("El carrito se ha vaciado.")

        } catch (error) {
            res.status(500).send({
                message: "Error en el servidor", 
                error: error.message
            })
        }

    } else {
        return res.status(401).send("No existe sesion activa.")
    }
}