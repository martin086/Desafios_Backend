//Desafio 3. SERVIDOR con EXPRESS
import express from 'express';
import ProductManager from './ProductManager.js';

const app = express() //app es igual a la ejecución de express
const PORT = 4000
const manager = new ProductManager("./src/productos.json");

//Permite realizar consultas en la URL (req.query)
app.use(express.urlencoded({extended:true})) 

//Ruta Raíz
app.get('/', (req, res) => {
    res.send("Desafío #3 - Servidor con Express.")
})

//Consulta de productos.
app.get('/products', async (req,res) => {
    const products = await manager.getProducts();
    let {limit} = req.query;
    let datos;
    if(!limit) {
        datos = products;
    } else {
        datos = products.slice(0, parseInt(limit));
    }
    res.send(`Estos son los productos existentes: ${datos}`);
});

//Consulta de productos según id.
app.get('/products/:id', async (req,res) => {
    const product = await manager.getProductById(parseInt(req.params.id));
    product === null ? res.send("Producto inexistente") : res.send(product);
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
