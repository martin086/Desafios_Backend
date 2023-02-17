import express from "express";
import routerProduct from "./routes/productos.routes.js";
import routerCart from "./routes/carritos.routes.js";
import { __dirname } from "./path.js";
import multer from 'multer';
import { engine } from 'express-handlebars';
import * as path from 'path'
import { Server } from "socket.io";
import routerSocket from "./routes/socket.routes.js";
import { ProductManager } from "./controllers/ProductManager.js";

const productManager =  new ProductManager('src/models/products.json');


//const upload = multer({dest:'src/public/img'}) Forma basica de utilizar multer
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req,file,cb) => {
        cb(null, `${file.originalname}`)
    }
})
const upload = multer({storage:storage});


//Express Server
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
  })
  

//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views'

//ServerIO
const io = new Server(server)


io.on("connection", (socket) => { //io.on es cuando se establece la conexion
    console.log("Cliente conectado")

    socket.on("addProduct", async info => {//Cuando recibo informacion de mi cliente
        const newProduct = {...info, status:true};
        let addMessage = await productManager.addProduct(newProduct);
        socket.emit("mensajeProdAgregado", addMessage)
        console.log(addMessage)
    })

    socket.on("deleteProduct", async id => {
        let deleteMessage = await productManager.deleteProduct(id)
        socket.emit("mensajeProdEliminado", deleteMessage)
        console.log(deleteMessage)
    })
    socket.emit("getProducts", productManager.getProducts());
})

//Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.use('/', routerSocket)
app.post('/upload',upload.single('product'), (req,res) => {
    console.log(req.file)
    res.send("Imagen subida")
})

//HBS
// app.get('/', (req,res) => {
//     // const products = [
//     //     {id: 1, title: "A/A 2250fr", description: "Aire acondicionado split 2250fr F/C", price: 100000, code: "#121", stock: 5, category: "A/A", status: true, thumbnail: ['../public/img/12-aireacondicionado.jpg']},
//     //     {id: 2, title: "A/A 3000fr", description: "Aire acondicionado split 3000fr F/C", price: 150000, code: "#122", stock: 8, category: "A/A", status: true, thumbnail: ['../public/img/12-aireacondicionado.jpg']},
//     //     {id: 3, title: "A/A 4500fr", description: "Aire acondicionado split 4500fr F/C", price: 200000, code: "#123", stock: 7, category: "A/A", status: true, thumbnail: ['../public/img/12-aireacondicionado.jpg']},
//     //     {id: 4, title: "A/A 6000fr", description: "Aire acondicionado split 6000fr F/C", price: 250000, code: "#124", stock: 6, category: "A/A", status: true, thumbnail: ['../public/img/12-aireacondicionado.jpg']},
//     // ]

//     // res.render("index", { //Renderizar el siguiente contenido
//     //     products
//     // })
// })
