import { ManagerMongoDB } from "../db/mongoDBManager.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  rol: {
    type: String,
    required: true,
    default: "User"
  },
  password: {
    type: String,
    required: true
  }
});

// const userModel = model('Users', userSchema);
// export default userModel
export class ManagerUserMongoDB extends ManagerMongoDB {
  constructor() {
      super(url, "users", userSchema)
  }

  async getElementByEmail(email) {
    super.setConnection()
    try {
      return await this.model.findOne({ email: email })
    } catch (error) {
      return error
    }
  }
  
}