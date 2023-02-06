//Desafio 3. SERVIDOR con EXPRESS
import express from 'express';
import ProductManager from './ProductManager.js';

const app = express() //app es igual a la ejecución de express
const PORT = 8080
const manager = new ProductManager("./src/productos.json");

//Permite realizar consultas en la URL (req.query)
app.use(express.urlencoded({extended:true})) 
//Permite manejar archivos JSON
app.use(express.json())


//Ruta Raíz
app.get('/', (req, res) => {
    res.send("Desafío #3 - Servidor con Express.")
})

//Consulta de productos.
app.get('/products', async (req,res) => {
    const products = await manager.getProducts();
    let {limit} = req.query;
    let datos;
    if(limit) {
        datos = products.slice(0, parseInt(limit));
        res.send(`Estos son los productos según límite: ${(JSON.stringify(datos))}`);
    } else {
        datos = products;
        res.send(`Estos son todos los productos existentes: ${(JSON.stringify(datos))}`);
    }
    
});

//Consulta de productos según id.
app.get('/products/:id', async (req,res) => {
    const product = await manager.getProductById(parseInt(req.params.id));
    product === null ? res.send("Producto inexistente") : res.send(`El producto con ID ${product.id} es el siguiente: ${(JSON.stringify(product))}`);
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
