// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, getDocs, getDoc, updateDoc, deleteDoc, collection, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "myapp-ecommerce-67f3e.firebaseapp.com",
  projectId: "myapp-ecommerce-67f3e",
  storageBucket: "myapp-ecommerce-67f3e.appspot.com",
  messagingSenderId: "959287224114",
  appId: "1:959287224114:web:46f3ab4f15b46b91bad92b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// CRUD Productos
const cargarBDD = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) => {
        await addDoc(collection(db,"productos"), {
            idCategoria: prod.idCategoria,
            nombre: prod.nombre,
            tipo: prod.tipo,
            precio: prod.precio,
            unidad: prod.unidad,
            stock: prod.stock,
            imagen: prod.imagen,
        })
    });
}

const getProductos = async () => {
    const productos = await getDocs(collection(db, "productos"))
    const items = productos.docs.map(prod => {
        return {...prod.data(), id: prod.id}
    })
    return items;
}

const getProducto = async (id) => {
    const producto = await getDoc(doc(db, "productos", id))
    const item = {...producto.data(), id: producto.id}
    return item;
}

const updateProducto = async (id, info) => {
    const estado = await updateDoc(doc(db, "productos", id), info)
    return estado;
}

const deleteProducto = async (id) => {
    const estado = await deleteDoc(doc(db, "productos", id))
    return estado;
}

// Create y Read Ordenes de Compra
const createOC = async (cliente, precioTotal, fecha, carrito) => {
    const ordenCompra = await addDoc(collection(db, "ordenCompra"),{
    nombreCompleto: `${cliente.firstName} ${cliente.lastName}` ,
    email: cliente.email,
    dni: cliente.dni,
    celular: cliente.cel,
    direccion: cliente.direccion,
    fecha: fecha,
    precioTotal: precioTotal,
    compra: carrito,
    })
    
    return ordenCompra;
}

const getOC = async (id) => {
    const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
    const item = {...ordenCompra.data(), id: ordenCompra.id}
    return item;
}


export {cargarBDD, getProductos, getProducto, updateProducto, deleteProducto, createOC, getOC};