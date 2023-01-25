/*Desafio 2*/
const fs = require('fs').promises
class ProductManager {
    static idCounter = 0;
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    addProduct(product) {
        //Validar que todos los campos sean completados.
        if (Object.values(product).includes("") || Object.values(product).includes(null)) {
            console.log("Todos los campos deben ser completados.");
        } else {
            // Validar que la propiedad "code" no esté repetida.
            const existingCode = this.products.find((prod) => prod.code === product.code);
            if (existingCode) {
                console.log(`El código ${existingCode.code} está duplicado. Ingrese uno diferente.`);
                } else {
                    // Agregar el producto al array.
                    this.products.push({...product, id: ++ProductManager.idCounter}); 
                }
        }
        //const agregarProd = async 
    }

    getProducts() {
        console.log("Listado completo de productos:");
        console.log(this.products);
        return this.products;
    }

    getProductById(id) {
        const findProduct = this.products.find((prod) => prod.id === id);
        if (findProduct) {
            let index = this.products.indexOf(findProduct);
            console.log("Se ha encontrado el siguiente producto:")
            console.log(this.products[index]);
        } else {
            console.log("Not found");
        }
    }
}


class Product {
    constructor(title, description, price, thumbnail, stock, code) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
        this.code = code
    }
}


//Instanciamos productManager.
const productManager = new ProductManager('./products.txt'); 
// Listamos array de productos, que debería estar vacío.
productManager.getProducts(); 
// Agregamos primer producto.
const producto1 = new Product("A/A 2250fr", "Aire acondicionado split 2250fr F/C", 100000, "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg", 5, "#101")
productManager.addProduct(producto1);
//Listamos array, que debería contener el producto recién ingresado.
productManager.getProducts(); 
// Agregamos productos adicionales
const producto2 = new Product("A/A 3000fr", "Aire acondicionado split 3000fr F/C", 150000, "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg", 8, "#102")
const producto3 = new Product("A/A 4500fr", "Aire acondicionado split 4500fr F/C", 200000, "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg", 7, "#103")
const producto4 = new Product("A/A 6000fr", "Aire acondicionado split 6000fr F/C", 250000, "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg", 6, "#104");

productManager.addProduct(producto2);
productManager.addProduct(producto3);
productManager.addProduct(producto4);

//Buscamos y mostramos los productos por consola utilizando su id. El último debería tirar error al no existir.
productManager.getProductById(1);
productManager.getProductById(2);
productManager.getProductById(3);
productManager.getProductById(4);