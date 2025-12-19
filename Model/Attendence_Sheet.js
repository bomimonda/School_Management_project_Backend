import mongoose from "mongoose";


let AttendenceList=new mongoose.Schema({
Class:{
    type:String,
    require:true

    },
    Attendencelist:[]
})

export default mongoose.model('attendence',AttendenceList,)