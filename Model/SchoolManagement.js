import mongoose from "mongoose"
let  Data=new mongoose.Schema({
    ClassName:{
        type:String,
        require:true
    },
    capacity:{
         type:String,
        require:true
    },
    Data:[],
    Studentlist:[]
})


export default mongoose.model("Student",Data)