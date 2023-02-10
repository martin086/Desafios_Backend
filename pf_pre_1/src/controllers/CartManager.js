import {promises as fs} from 'fs'

class Cart {
    constructor(id, products) {
        this.id = Cart.addId();
        this.products = products;
    }

    static addId(){
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

}


export class CartManager {
    constructor(path) {
        this.path = path
    }

    addCart = async () => {
        try {
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if (carts) { 
                const nuevoCarrito = new Cart (carts.id = Cart.addId(), []);
                carts.push(nuevoCarrito);
                await fs.writeFile(this.path, JSON.stringify(carts))
                return console.log(`Carrito con id:${nuevoCarrito.id} creado`)
            }
        } catch (error) {
            await this.createJson();
            return "Array de carritos creado."
        }
        
    
    }

    getCartById = async (id) => {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(carts.some(cart => cart.id === parseInt(id))) {
            return carts.find(cart => cart.id === parseInt(id))
        } else {
            return "Carrito no encontrado"
        }
    }

    addProductToCart = async (id, {idProduct, quantity}) => {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(carts.some(cart => cart.id === parseInt(id))) {
            let index = prods.findIndex(prod => prod.id === parseInt(idProduct))
            prods[index].quantity = quantity
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Producto actualizado"
        } else {
            return "Producto no encontrado"
        }
    }

    deleteCart = async (id) => {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(carts.some(cart => cart.id === parseInt(id))) {
            const cartsFiltrados = carts.filter(cart => cart.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(cartsFiltrados))
            return "Carrito eliminado"
        } else {
            return "Carrito no encontrado"
        }
    }

    async createJson() {
        //Creamos archivo JSON de carrito.
        await fs.writeFile(this.path, "[]");
    }

}