/*Desafio 1*/
class ProductManager {
    static idCounter = 0;
    constructor() {
        this.products = [];
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
const productManager = new ProductManager(); 
// Listamos array de productos, que debería estar vacío.
productManager.getProducts(); 
// Agregamos primer producto ejemplo.
productManager.addProduct({
  title: "A/A 2250fr",
  description: "Aire acondicionado split 2250fr F/C",
  price: 100000,
  thumbnail: "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg",
  stock: 5,
  code: 1,
});
//Listamos array, que debería contener el producto recién ingresado.
productManager.getProducts(); 
// Agregamos segundo producto ejemplo con código duplicado. Debería salir error.
productManager.addProduct({
    title: "A/A 3000fr",
    description: "Aire acondicionado split 3000fr F/C",
    price: 150000,
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg",
    stock: 8,
    code: 1,
  });
// Agregamos tercer producto ejemplo.
productManager.addProduct({
    title: "A/A 4500fr",
    description: "Aire acondicionado split 4500fr F/C",
    price: 200000,
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg",
    stock: 7,
    code: 3,
  });
//Agregamos cuarto producto ejemplo con un campo vacío. Debería salir error.
productManager.addProduct({
    title: "A/A 6000fr",
    description: "Aire acondicionado split 6000fr F/C",
    price: 250000,
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg",
    stock: null,
    code: 4,
});
//Creamos nuevamente el producto 4, esta vez ingresando los valores por parámetro.
const producto4 = new Product("A/A 6000fr", "Aire acondicionado split 6000fr F/C", 250000, "Ruta imagen", 6, 04);
productManager.addProduct(producto4);
//Buscamos y mostramos los productos por consola utilizando su id.
productManager.getProductById(1);
productManager.getProductById(2);
productManager.getProductById(3);