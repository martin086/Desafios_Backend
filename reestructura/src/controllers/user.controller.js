//import { getManagerUsers } from "../dao/daoManager.js";
import { createHash } from "../utils/bcrypt.js";
import { findUsers, findUserById, findUserByEmail, createUser } from "../services/UserService.js";

export const getUsers = async (req,res) => {
    try {
        const users = await findUsers()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).send({
            message: "Error en el server",
            error: error.message
        })
    }
}


// const userManagerData = await getManagerUsers()
// export const userManager = new userManagerData()

export const createNewUser = async (req, res) => {
    try {
        const user = await createUser(user)
        res.send({ status: "success", message: "User Created Successfully" })
    } catch (error) {
        res.status(500).send(error)
    }
    
}
