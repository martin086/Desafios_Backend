
export const getProducts = async (limit, page, category, stock, sort) => { //Verificados en la funcion principal
    const response = await fetch(`http://localhost:4000/api/products?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
        },
        body: ""//
    })
    const products = await response.json()
    return products
}

export const getProductById = async (id) => {
    const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
        },
        body: ""//
    })
    const product = await response.json()
    return product
}

export const getProductByCode = async (id) => {
    const response = await fetch(`http://localhost:4000/api/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
        },
        body: JSON.stringify(code)//
    })
    const product = await response.json()
    return product
}

export const createProduct = async (producto) => {
    //Verificacion si existe el producto
    if (getProductByCode(producto.code)) {
        //Error
    } else {
        const response = await fetch(`http://localhost:4000/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
            },
            body: JSON.stringify(producto)//
        })
        const message = await response.json()
        return message
    }
}

export const updateProduct = async (producto) => {
    //Verificacion si existe el producto
    if (getProductById(producto.id)) {
        const response = await fetch(`http://localhost:4000/api/products/${producto.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
                //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
            },
            body: JSON.stringify(producto)//
        })
        const message = await response.json()
        return message
    } else {
        //Error

    }
}

export const deleteProduct = async (id) => {
    //Verificacion si existe el producto
    if (getProductById(producto.id)) {
        const response = await fetch(`http://localhost:4000/api/products/${producto.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
            },
            body: ""
        })
        const message = await response.json()
        return message
    } else {
        //Error

    }
}