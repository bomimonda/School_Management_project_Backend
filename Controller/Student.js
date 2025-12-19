import Student1 from "../Model/Student.js";
import Fees from "../Model/Fee.js";
import mongoose from "mongoose";





    const months = Array.from({ length: 12 }, (_, i) => 
  new Date(0, i).toLocaleString("en", { month: "long" })
)

let P=months.map((val,ind) => {
    
    
    return {[val]:[]}
})



let Letast= new Date().toLocaleString("en", { month: "long" })
console.log(Letast);



export let Studentload=async(req,res)=>{
  let a= await Student1.find()
    res.status(200).json({
    message:"Request Successfull",
    Data:a
  })

}





export let StudentDelete=async(req,res)=>{
   
     const { id } = req.params;
    //   console.log(id);
    
const monthIndex = months.indexOf(Letast);
      
    let a=await Student1.findByIdAndDelete(id)
    console.log(a);
     const studentClass =a.Studentclass;
      const studentObjectId = new mongoose.Types.ObjectId(id);
   let Ma= await Fees.updateOne(
  { Class:studentClass },
{
        $pull: {
         [`data.0.Mounth.${monthIndex}.${Letast}`]:{Studentid:studentObjectId }
        }
      }
);
console.log(Ma);


    res.status(200).json({
        message:"Data delete Successfully",
        data:a
    })
    
    
}


export let StudentData = async (req, res) => {
  console.log(req.body);
  let { First, Last, email, ClassName, Enrollment,PortalID,Phone } = req.body;
  let a = await Student1.insertOne({
    Student: `${First} ${Last}`,
    Studentclass:ClassName,
    Data: [{email, Enrollment, ClassName,PortalID:`${PortalID}`,Phone}],
  });
  console.log(a);



const monthIndex = months.indexOf(Letast);

  P[monthIndex][Letast].push({
    Studentid:a._id,
    Status:"Pending"


  })


  console.log("PPPPPPPPPP");
  

  console.log(P);
  


  
  let Fee1=await Fees.find({Class:ClassName})
  console.log("Fee");
  
  // console.log(Fee1[0].data[0].Mounth[monthIndex][Letast]);
  if (Fee1.length!==0) {
   
  if (Fee1[0].data[0].Mounth[monthIndex][Letast].length==0) {
    let Student11= await Student1.find({Studentclass:ClassName})
    // console.log(Student11);
    let Data1=Student11.map((val,ind)=>{
         return{Studentid:val._id,Status:"Pending"}

      
    })

    
let Fee2=await Fees.updateOne(
  { Class: ClassName },
  {
    $set: { [`data.0.Mounth.${monthIndex}.${Letast}`] :Data1 }
  }
);
   console.log('Fee2');
   
console.log(Fee2);

    console.log(P);
    
    
    
    
  }else{
      let newStudent={
    Studentid:a._id,
    Status:"pending"
  }
let Fee2=await Fees.updateOne(
  { Class: ClassName },
  {
    $push: { [`data.0.Mounth.${monthIndex}.${Letast}`]: newStudent }
  }
);
  }
  
// let Fee2=await Fees.updateOne(
//   { Class: ClassName },
//   {
//     $push: { [`data.0.Mounth.${monthIndex}.${Letast}`]: newStudent }
//   }
// );

  }
 
  
  res.status(200).json({
    message:"Request Successfull",
    Data:a
  })
};






export let StudentUpdate=async(req,res)=>{
     const { id } = req.params;

          console.log(id);
     console.log(req.body);
  let { First, Last, email, ClassName, Enrollment,PortalID,Phone } = req.body;
     let data1={
 Student: `${First} ${Last}`,
    Studentclass:ClassName,
    Data: [{email, Enrollment, ClassName,PortalID:`ST${PortalID}`,Phone}],
     }

     let a=await Student1.findByIdAndUpdate(id,data1,{ new: true })

     
  res.status(200).json({
    message:"Request Successfull",
    Data:a
  })

}