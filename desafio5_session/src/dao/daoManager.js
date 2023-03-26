const selectedDB = process.env.DBSELECTION

//O importo MongoDB o importo Postgres
export const getManagerProducts = async() => {
    const modelProduct = selectedDB == 1 
    ? await import('./MongoDB/models/Product.js').then(module => module.default) 
    : await import('./Postgresql/models/Product.js').then(module => module.default)
    return modelProduct
}

export const getManagerCart = async() => {
    const modelCart = selectedDB == 1 
    ? await import('./MongoDB/models/Cart.js').then(module => module.default) 
    : await import('./Postgresql/models/Cart.js').then(module => module.default)
    return modelCart
}

export const getManagerMessages = async() => {
    const modelMessage = selectedDB == 1 
    ? await import('./MongoDB/models/Message.js').then(module => module.default) 
    : await import('./Postgresql/models/Message.js').then(module => module.default)
    return modelMessage
}

export const getManagerUsers = async() => {
    const modelUser = selectedDB == 1 
    ? await import('./MongoDB/models/User.js').then(module => module.default) 
    : await import('./Postgresql/models/User.js').then(module => module.default)
    return modelUser
}