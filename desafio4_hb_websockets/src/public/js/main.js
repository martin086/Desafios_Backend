//Front
const socket = io()

const form = document.getElementById("realTimeProductsForm")
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value
    const code = document.getElementById("code").value
    const stock = document.getElementById("stock").value
    const category = document.getElementById("category").value
    const product = {title,description,price,code,stock,category,thumbnail}
    socket.emit("addProduct", product) //Enviar informacion a mi servidor
})

socket.on("mensajeAddProduct", mensaje => {
    console.log(mensaje)
})


socket.on("getProducts", products => {
    let productsCard = document.getElementById("productsCard").innerHTML=""
    
    products.forEach(product => {
        productsCard.innerHTML += 
        `
        <div class="card col-sm-2 cardProduct">
        <img class="card-img-top imgCardProducts" src="${product.thumbnail}">
        <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
            <p class="card-text">ID: ${product.id} </p>
            <p class="card-text">${product.description} </p>
            <p class="card-text">Precio: ${product.price} </p>       
            <p class="card-text">Stock: ${product.stock} </p>   
            <p class="card-text">Code: ${product.code} </p>                                               
            <a id="btnProduct${product.id}" class="btn btn-danger">Eliminar</a>
        </div>
        `
    });

    products.forEach(product => {
        const btnProduct = document.getElementById(`btnProduct${product.id}`)
        btnProduct.addEventListener("click", (e)=>{
            socket.emit("deleteProduct", product.id)
            socket.on("mensajeProductoEliminado", mensaje => {
                console.log(mensaje)
            })
        })
    })
})