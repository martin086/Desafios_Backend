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
import express from 'express'

const app = express() //app es igual a la ejecución de express
const PORT = 4000

const users = [
    {
        nombre: "Firu",
        apellido: "Firulais",
        id: 1,
        cargo: "Tutor",
    },
    {
        nombre: "Pepe",
        apellido: "Lepu",
        id: 2,
        cargo: "Tutor",
    },
    {
        nombre: "Super",
        apellido: "Hijitus",
        id: 3,
        cargo: "Jefecito",
    }
]

app.use(express.urlencoded({extended:true})) //Permite realizar consultas en la URL (req.query)

app.get('/', (req, res) => {
    res.send("Este es mi primer servidor con Express.")
})

app.get('/user', (req,res) => {
    let {cargo, nombre} = req.query
    const usuarios = users.filter(user => user.cargo = cargo)
    //console.log(cargo, nombre)
    res.send(JSON.stringify(usuarios))

})


app.get('/user/:idUser', async (req,res) => {
    const idUser = req.params.idUser;
    const user = users.find(user => user.id === parseInt(idUser));
    if(user) {
        res.send(`Nombre de Usuario: ${user.nombre} ${user.apellido} ${user.cargo}`);
    } else {
        res.send(`Usuario inexistente.`);
    }
    
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
