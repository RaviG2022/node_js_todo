import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Users = mongoose.model("Users", userSchema);
