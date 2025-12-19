import School from "../Model/SchoolManagement.js"

export let Classload=async(req,res)=>{
    let a=await School.find()
res.status(200).json({
    message:"Request Successfully",
    data:a,

})

}



export let ClassDelete=async(req,res)=>{
   
     const { id } = req.params;
    //   console.log(id);
      
    let a=await School.findByIdAndDelete(id)
    console.log(a);
    res.status(200).json({
        message:"Data delete Successfully",
        data:a
    })
    
    
}



export let ClassUpdate=async(req,res)=>{
     const { id } = req.params;
          console.log(id);
     console.log(req.body);
     let{ClassName,capacity,ClassteacherName,Academicyear,Homeroom}=req.body
     let data1={
         ClassName:ClassName,
    capacity:capacity,
    Data:[
{
            ClassteacherName,
        Academicyear,
        Homeroom
}
    ],
   
     }

     let a=await School.findByIdAndUpdate(id,data1,{ new: true })
     console.log("uppppsss");
     
     console.log(a);

     
res.status(200).json({
    message:"Request Successfully",
    data:a,

})
     

}



export let ClassDataEnter=async(req,res)=>{
console.log(req.body);
let{ClassName,capacity,ClassteacherName,Academicyear,Homeroom}=req.body

let a=await School.insertOne({
    ClassName:ClassName,
    capacity:capacity,
    Data:[
{
            ClassteacherName,
        Academicyear,
        Homeroom
}
    ],
    Studentlist:[]
})

res.status(200).json({
    message:"Request Successfully",
    data:a,

})

}