/*
SERVIDOR HTTP

import http from 'http'
const PORT = null ?? 4000; //Creamos un puerto

//Datos que entran(request) - Datos que se devuelven (response)
const server = http.createServer((request, response) => {
    response.end("Hola, este es mi primer servidor en NODE.")
})

//Ejecutar servidor
server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
*/

//SERVIDOR con EXPRESS
import express from 'express';

import ProductManager from '../productos.json';

const app = express() //app es igual a la ejecución de express
const PORT = 4000
const manager = new ProductManager("../productos.json");


// const users = [
//     {
//         nombre: "Firu",
//         apellido: "Firulais",
//         id: 1,
//         cargo: "Tutor",
//     },
//     {
//         nombre: "Pepe",
//         apellido: "Lepu",
//         id: 2,
//         cargo: "Tutor",
//     },
//     {
//         nombre: "Super",
//         apellido: "Hijitus",
//         id: 3,
//         cargo: "Jefecito",
//     }
// ]

//Permite realizar consultas en la URL (req.query)
app.use(express.urlencoded({extended:true})) 

//Ruta Raíz
app.get('/', (req, res) => {
    res.send("Este es mi primer servidor con Express.")
})


//Consulta tipo = http://localhost:4000/user?cargo=Tutor&nombre=Kevin
app.get('/products', async (req,res) => {
    const products = await manager.getProducts()
    let {limit} = req.query
    if(limit) {
        res.send(products.slice(0, limit))
    } else {
        res.send(products)
    }
    
})


app.get('/products/:id', async (req,res) => {
    const product = await manager.getProductById(parseInt(req.params.id));
    console.log(product);
    res.send(product);
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
