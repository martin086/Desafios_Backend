import {promises as fs} from 'fs'

export class CartManager {
    constructor(path) {
        this.path = path
    }

    static incrementarID() {
        if(this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async addCart(cart) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        carrito.id = CartManager.incrementarID()
        carts.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito creado"
    }

    async getCartById(id) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(carts.some(cart => cart.id === parseInt(id))) {
            return carts.find(cart => cart.id === parseInt(id))
        } else {
            return "Carrito no encontrado"
        }
    }

    async addProductToCart(id, {idProduct, quantity}) {
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

    async deleteCart(id) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(carts.some(cart => cart.id === parseInt(id))) {
           const cartsFiltrados = carts.filter(cart => cart.id !== parseInt(id))
           await fs.writeFile(this.path, JSON.stringify(cartsFiltrados))
           return "Carrito eliminado"
        } else {
            return "Carrito no encontrado"
        }
    }

}