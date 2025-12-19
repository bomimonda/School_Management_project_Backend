import mongoose from "mongoose";



let Student11=new mongoose.Schema({
    Student:{
        type:String,
        require:true
    },
    Studentclass:{
          type:String,
        require:true
    },
    Data:[]
})

export default mongoose.model("Student1",Student11)