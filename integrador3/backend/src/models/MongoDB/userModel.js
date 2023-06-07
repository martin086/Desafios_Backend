import { Schema, model } from "mongoose";
import { Roles } from "../../config/middlewares.js";

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
    ref: 'Carts',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userModel = model('premiumUsers', userSchema);

export default userModel