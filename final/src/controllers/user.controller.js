//import { getManagerUsers } from "../dao/daoManager.js";
import { createHash } from "../utils/bcrypt.js";
import { findUsers, findUserById, findUserByEmail } from "../services/UserService.js";

export const getUsers = async (req,res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}





// const userManagerData = await getManagerUsers()
// export const userManager = new userManagerData()

// export const createUser = async (req, res) => {
//     res.send({ status: "success", message: "User Created Successfully" })
// }
