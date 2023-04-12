import { getManagerUsers } from "../dao/daoManager.js";
import { createHash } from "../utils/bcrypt.js";

const userManagerData = await getManagerUsers()
export const userManager = new userManagerData()

export const createUser = async (req, res) => {
    res.send({ status: "success", message: "User Created Successfully" })
}
