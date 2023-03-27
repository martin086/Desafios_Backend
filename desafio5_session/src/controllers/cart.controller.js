import { getManagerCart, getManagerProducts } from '../dao/daoManager.js'

const cartManagerData = await getManagerCart()
const cartManager = cartManagerData

const productManagerData = await getManagerProducts()
const productManager = new productManagerData()

//Create New Cart
export const createCart = async (req, res) => {
    try {
        const cart = {}
        const newCart = await cartManager.addElements(cart)
        res.send({
            status: "success",
            payload: newCart
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
}
//Get specified Cart and populate
export const getCart = async (req, res) => {
    try {
        const cart = await cartManager.getElementById(req.params.cid)
        const popCart = await cart.populate({path:'products.productId', model: cartManager.productModel})
        
        res.send({
            status: "success",
            payload: popCart
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
}
//Add a product to Cart
export const addProductCart = async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    
    try {
        const newProduct = await productManager.getElementById(idProduct);
        //console.log(newProduct)
        if(newProduct) {
            console.log("llegué al if")
            const cart = await cartManager.addProductToCart(idCart, idProduct);
            
            res.send({
                status: "success",
                payload: cart
            })
        } else {
            res.send({
                status: "error",
                payload: `Product ${idProduct} not found.`
            })
        }
        
    } catch (error) {
        res.send({
            status: "error",
            payload: `Product ${idProduct} was not added.`
        })
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
    try {
        const {quantity} = req.body;
        const updatedProduct = await cartManager.updateProdQty(req.params.cid, req.params.pid, quantity);

        res.send({
            status: "success",
            payload: updatedProduct
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
}
//Elimina el producto seleccionado del carrito.
export const removeProductCart = async (req, res) => {
    try {
        //const cartData = await cartManager.getElementById((req.params.cid))
        //const productData = await prodManager.getElementById((req.params.pid))

        const updatedCart = await cartManager.deleteProductFromCart(req.params.cid, req.params.pid)

        res.send({
            status: "success",
            payload: updatedCart
        })
    
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }

}
//Remove all products from cart.
export const emptyCart = async (req, res) => {
    try {
        const cartData = await cartManager.getElementById((req.params.cid))
        const emptyCart = await cartManager.deleteAllProducts(cartData)

        res.send({
            status: "success",
            payload: emptyCart
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }

}