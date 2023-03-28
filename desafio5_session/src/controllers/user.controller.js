import { getManagerUsers } from "../dao/daoManager.js";
import { createHash } from "../utils/bcrypt.js";

const userManagerData = await getManagerUsers()
export const userManager = new userManagerData()

export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, role = "user" } = req.body

    try {
        const user = await userManager.getElementByEmail(email)
        if (user) {
            res.status(400).json({
                message: "User already exists"
            })
        } else {
            const hashPassword = createHash(password)
            const userCreated = await userManager.addElements([{
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashPassword,
                role: role
            }])

            res.status(200).json({
                message: { message: "User created",
                userCreated }
            })
        }


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
