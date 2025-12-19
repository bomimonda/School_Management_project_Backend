import mongoose, { Schema } from "mongoose";


let Fee_Model=new Schema({
   Class: {
    type: String,
    required: true,
   
  },
  data:[]
})

export default mongoose.model("Fees",Fee_Model)