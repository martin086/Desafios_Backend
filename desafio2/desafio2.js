/*Desafio 2*/
const fs = require('fs').promises;
const ruta = "./productos.json";


class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.addId()
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

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async(product) => {
        //Validar que todos los campos sean completados que la propiedad "code" no esté repetida.
        const read = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(read);
        const prodCode = data.map((prod) => prod.code);
        const prodExist = prodCode.includes(product.code); 
        if (prodExist) {
            return console.log (`El código ${product.code} ya existe. Ingrese uno diferente.`)
        } else if (Object.values(product).includes("") || Object.values(product).includes(null)) {
            return console.log("Todos los campos deben ser completados.");
        } else {
            const nuevoProducto = {...product};
            data.push(nuevoProducto);
            await fs.writeFile(this.path, JSON.stringify(data), 'utf-8')
            //console.log(data)
            return console.log(`El producto con id: ${nuevoProducto.id} ha sido agregado.`)
        }
    }

    getProducts = async () => {
        const read = await fs.readFile(this.path, 'utf-8')
        const data = JSON.parse(read)
        if (data.length != 0) {
            console.log("Listado completo de productos:");
            console.log(data);
        } else {
            console.log ("No se encuentran productos en el listado.")
        }
    }

    getProductById = async (id) => {
        const read = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(read);
        const findProduct = data.find((prod) => prod.id === id);
        if (findProduct) {
            console.log("Se ha encontrado el siguiente producto:")
            return console.log(findProduct);
        } else {
            return console.log("Product Not found");
        }
    }

    async deleteProduct(id) {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const productoEliminado = JSON.stringify(
        data.find((product) => product.id === id)
        );
        const newData = data.filter((product) => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
        return console.log(
        `El producto ${productoEliminado} ha sido eliminado exitosamente`
        );
    }

    async updateProduct(id, entry, value) {
            const read = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(read);
            const index = data.findIndex((product) => product.id === id);
            if(!data[index][entry]){
                return console.log("El producto no pudo ser actualizado.")
            } else {
                data[index][entry] = value;
                await fs.writeFile(this.path, JSON.stringify(data, null, 2));
                console.log("El producto se ha modificado de la siguiente manera:")
                return console.log(data[index]);
            }
            
    }
}


//TESTING
//Instanciamos productManager.
const productManager = new ProductManager(ruta); 



// Agregamos productos.
const aa2250 = new Product("A/A 2250fr", "Aire acondicionado split 2250fr F/C", 100000, "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg", "#101", 5);
const aa3000 = new Product("A/A 3000fr", "Aire acondicionado split 3000fr F/C", 150000, "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg", "#102", 8);
const aa4500 = new Product("A/A 4500fr", "Aire acondicionado split 4500fr F/C", 200000, "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg", "#103", 7);
const aa6000 = new Product("A/A 6000fr", "Aire acondicionado split 6000fr F/C", 250000, "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg", "#104", 6);

const test = async() => {
    //Creamos archivo JSON.
    //await nuevoJson(ruta);
    // Listamos array de productos, que debería estar vacío.
    await productManager.getProducts(); 
    await productManager.addProduct(aa2250);
    await productManager.addProduct(aa3000);
    await productManager.addProduct(aa4500);
    await productManager.addProduct(aa6000);
}

test()
/*
//Buscamos y mostramos los productos por consola utilizando su id. El último debería tirar error al no existir.
productManager.getProductById(1);
productManager.getProductById(2);
productManager.getProductById(3);
productManager.getProductById(4);
*/
