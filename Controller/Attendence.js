import Teacher from "../Model/TeacherModel.js";
import Student1 from "../Model/SchoolManagement.js";
import Student from "../Model/Student.js";
import attendence from "../Model/Attendence_Sheet.js";

export let Attendence1 = async (req, res) => {
  // console.log(req.body);
  let { Name, email } = req.body;

  let a = await Teacher.find({ Name, email });
  // console.log(a[0]._id);

  

  let b = await Student1.findOne({
    "Data.ClassteacherName": a[0]._id.toString(),
  });

  // console.log("b");

  // console.log(b.ClassName);

  let c = await Student.find({ Studentclass: b.ClassName });
  // console.log("c");

  // console.log(c);

  res.status(200).json({
    message: "Request Success Sully",
    data: c,
    stattus: 200,
  });
};


let mounthindex=new Date().getMonth()
console.log(mounthindex);
const monthName = new Date().toLocaleString("default", { month: "long" });


export let AttendenceSheet=async(req,res)=>{
    console.log(req.body);
    let{Class,Mounth,date,Attendence}=req.body




   const updateResult = await attendence.updateOne(
      { Class: Class,  [`Attendencelist.${mounthindex}.${Mounth}.Date`]: date},
      { 
    $set: { [`Attendencelist.${mounthindex}.${Mounth}.$.Attendence`]: Attendence } 
  }
    );

    console.log("Update result:", updateResult);


    if (updateResult.matchedCount==0) {
      
 const pushResult = await attendence.updateOne(
        { Class: Class },
       { $push: { [`Attendencelist.${mounthindex}.${Mounth}`]: { Date: date, Attendence: Attendence } }}

      
      );
      console.log(pushResult);
    }
    
    
    
   


   

 


  let detail={
     Present:0,
    Absent:0,
    Late:0,
      Excused:0
  }

Attendence.forEach(val => {
  if (detail[val.status] !== undefined) {
    detail[val.status]++;
  }
});
  // console.log(detail);
  


  res.status(200).json({
    message:"Request success full",
    data:detail,
    status:200

  })
   
    
    
}


 export let AttendenceGet=async(req,res)=>{
  console.log("Hemogblbal");

  console.log(req.body);
  let{Teacher1,date,email}=req.body

  
  let a = await Teacher.find({Name:Teacher1,email});
  console.log("lololloo");
  
  console.log(a);

  

  let b = await Student1.findOne({
    "Data.ClassteacherName": a[0]._id.toString(),
  });

  

  console.log(b.ClassName);





let doc = await attendence.findOne({ Class: b.ClassName });

if (!doc) {
  return console.log("Class not found");
}

const monthObj = doc.Attendencelist[mounthindex];   
const monthArray = monthObj[monthName];            

if (!monthArray) {
  return console.log("Month not found");
}

const record = monthArray.find(r => r.Date === date);

console.log("Record:", record);
















if (record!==undefined) {
  res.status(200).json({
  message:'Request successfully',
  data:record,
  status:200
})
}





  
}