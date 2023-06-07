import { Roles } from "../config/middlewares.js";
import { findUsers, findUserById, findUserByEmail, findUserByToken, createUser, deleteUser, updateUser } from "../services/UserService.js";
import { EErrors } from "../utils/customErrors/enums.js";

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

export const getUserByEmail = async (req,res) => {
    try {
        const user = await findUserByEmail(email)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            message: "No se pudo obtener el usuario.",
            error: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await findUserById(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};



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

export const deleteUserById = async (req, res) => {
    try {
        const uid = req.params.userId;
        await deleteUser(uid);
        res.status(200).send(`User [ID:${uid}] deleted successfully`);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateUserById = async (req, res) => {
    try {
        const uid = req.params.userId;
        const data = req.body;
        await updateUser(uid, data);
        res.status(200).send(`User [ID:${uid}] updated successfully`);
    } catch (error) {
        res.status(500).send(error);
    }
};


export const setPremium = async (req, res, next) => {
    try {
        const foundUser = await findUserById(req.params.uid)

        if (!foundUser) {
        res.status(404).send({
            status: 'error',
            message: 'User not found'
        })
        return next()
        }

        let role
        // * No admins in DB
        foundUser.role === Roles.USER ? role = Roles.PREMIUM : role = Roles.USER
        await updateUser(req.params.uid, { role: role })

        res.status(200).send({
        status: 'success',
        message: `User ${foundUser.email} role is now: ${role}`
        })

    } catch (error) {
        if (error instanceof EErrors) {
        res.status(400).json({
            error: error.name,
            message: error.message,
        })
        } else {
        res.status(500).send({
            status: 'error',
            message: error.message
            })
        }
    }
}
