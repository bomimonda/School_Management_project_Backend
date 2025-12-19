import mongoose from "mongoose";



let Teacher=new mongoose.Schema({
    PortalID:{
        type:String,
        require:true
    },
    Name:{
        type:String,
        require:true
    },
      email:{
        type:String,
        require:true
    },
    Teacherinfo:[]
    
})

export default mongoose.model("Teacher",Teacher)