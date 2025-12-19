import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  portalId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
}, { timestamps: true });

export default mongoose.model("admins", userSchema);


