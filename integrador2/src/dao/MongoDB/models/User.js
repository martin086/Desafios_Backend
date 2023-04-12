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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "User"
  },
  idCart: {
    type: Schema.Types.ObjectId,
    ref: 'carts'
  },
  createdAt: {
    type: Date,
    default: Date.now
}
});

// const userModel = model('Users', userSchema);
// export default userModel
class ManagerUserMongoDB extends ManagerMongoDB {
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

export default ManagerUserMongoDB