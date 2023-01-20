/*Desafio 1*/
class ProductManager {
    static idCounter = 0;
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
        this.code = code
        this.id = ++ProductManager.idCounter
        this.products = []
    }

    addProduct (product) {
        //Validar que todos los campos sean completados.
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Todos los campos deben ser completados.");
            return;
          }

        // Validar que la propiedad "code" no esté repetida.
        for (const existingProduct of this.products) {
            if (existingProduct.code === product.code) {
              console.log("Ese código está duplicado. Ingrese uno nuevo.");
              return;
            }
          }
      
          // Agregar el producto al array.
          this.products.push(product);        
    }

    getProducts() {
        return this.products;
    }

    getProductById() {
        if (producto = products.find(producto => producto.id === id)) {
            let index = products.indexOf(producto);
            console.log(products[index]);
        } else {
            console.log("Not found");
        }
    }

}

const product1 = new ProductManager();

product1.addProduct({
  title: "Producto Ejemplo",
  description: "Este es un producto de ejemplo",
  price: 10,
  thumbnail: "https://firebasestorage.googleapis.com/v0/b/myapp-ecommerce-67f3e.appspot.com/o/12-aireacondicionado.jpg?alt=media&token=d63b800f-aec1-4132-abbe-21164830dfe5example.jpg",
  code: "123",
  stock: 5,
});

console.log(getProducts(products));
ProductManager.getProductById(1);