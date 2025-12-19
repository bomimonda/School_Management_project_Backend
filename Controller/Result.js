import result from "../Model/Result_list.js"


export let Subject_list=async(req,res)=>{
let{id}=req.body
    console.log(id);
    
    
  let a= await result.find({Class:id})
//   console.log(a);

  console.log(JSON.stringify(a, null, 2));
  console.log(a[0].Subjects);

if (a[0].Subjects!==undefined) {
    res.status(200).json(
  {
      message:"Request Successfull",
    status:200,
    data:a[0].Subjects
  }
  )
}else{
    res.status(200).json(
  {
      message:"Request Successfull",
    status:200,
    data:[]
  }
  )
}
  
  
}


 export let Student_Result=async(req,res)=>{

    let{Class,EaxmName,id}=req.body
  let subjectMarks = Object.entries(req.body)
  .filter(([key]) => key !== "EaxmName" && key!=="id" && key!=="Class")
  .map(([subject, marks]) => ({ subject, marks }));
    

let doc = await result.findOne({ Class, "Result.Exam": EaxmName });

if (!doc) return;

let exam = doc.Result.find(r => r.Exam === EaxmName);
let student = exam.Data.find(d => d.Studentid === id);

if (student) {
  student.Marks = subjectMarks;   // update
} else {
  exam.Data.push({ Studentid: id, Marks: subjectMarks });  // insert
}

await doc.save();

// console.log(doc);
 let f=exam.Data.filter((val,ind)=>{
         return val.Studentid==id
 })


console.log(f);
res.status(200).json({
    message:"Request Successful",
    status:200,
    data:f
})








//     console.log(req.body);
//     let{EaxmName,Class,id}=req.body
// console.log(EaxmName);
// console.log(Class);


//     let data={}

//     let subjectMarks = Object.entries(req.body)
//   .filter(([key]) => key !== "EaxmName" && key!=="id" && key!=="Class")
//   .map(([subject, marks]) => ({ subject, marks }));


// data.subjectMarks=subjectMarks
// data.Studentid=req.body.id
// console.log(data);



// let a = await result.updateOne(
//   { Class: Class, "Result.Exam": EaxmName },
//   {
//     $push: {
//       "Result.$.Data": {
//         Studentid: data.Studentid,
//         Marks: data.subjectMarks
//       }
//     }
//   }
// )


// let a = await result.updateOne(
//   { Class: Class, "Result.Exam": EaxmName },
//   {
//     $push: {
//       "Result.$.Data": {
//         Studentid: data.Studentid,
//         Marks: data.subjectMarks
//       }
//     }
//   }
// );


//     let a= await result.updateOne(
 
// { Class: Class, "Result.Exam": EaxmName },
//   {
//     $push: {
//      "Result.$.Data": [data.subjectMarks]

//     }
//   }
//     )

//     console.log(a);
    



// console.log("ppppapap");

    // console.log(a);


        
//   let b= await result.find({Class:Class})
// //   console.log(a);

//   console.log(JSON.stringify(b, null, 2));
//   console.log(b[0].Result[0]);

    
    
    // let b = await result.find()
}


export let Student_Result_id=async(req,res)=>{
  console.log(req.body);
  
  const {id,Term}= req.body
  console.log("Term");
  
  console.log(Term);

   
  const results = await result.aggregate([
  { $unwind: "$Result" },
  { $unwind: "$Result.Data" },
  { 
    $match: { 
      "Result.Data.Studentid": id,
      "Result.Exam": Term   // ✅ Add exam filter
    } 
  },
  {
    $project: {
      _id: 0,
      Class: 1,
      Exam: "$Result.Exam",
      Studentid: "$Result.Data.Studentid",
      Marks:"$Result.Data.Marks"
    }
  }
]);
console.log("Result hopshshs");

console.log(results);





res.status(200).json({
  message:"Request Successfully",
  Status:200,
  data:results
})





















  

// const results = await result.aggregate([
//   { $unwind: "$Result" },
//   { $unwind: "$Result.Data" },
//   { $match: { "Result.Data.Studentid":id } },
//   {
//     $project: {
//       Class: 1,
//       Exam: "$Result.Exam",
//       // Subjects: 1,
//       Studentid: "$Result.Data.Studentid",
//       Marks: "$Result.Data.Marks"
//     }
//   }
// ]);

// console.log(results);

// res.status(200).json({
//   message:"Request Successfully",
//   Status:200,
//   data:results
// })

}
