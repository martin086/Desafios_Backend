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
    type: Number,
    required: true,
    default: Roles.USER
  },
  idCart: {
    type: Schema.Types.ObjectId,
    ref: 'premiumCarts',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userModel = model('premiumUsers', userSchema);

export default userModel