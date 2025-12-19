import Student1 from "../Model/Student.js";
import attendence from "../Model/Attendence_Sheet.js";
export let Student_Attendence = async (req, res) => {
  console.log(req.body);
  const date = new Date();
  const monthName = date.toLocaleString("default", { month: "long" });

  console.log(monthName);
  let mounthindex=new Date().getMonth()

  let { Name, email, role } = req.body;
  let a = await Student1.find({ Student: Name, "Data.email": email });
  console.log("Helo");

  let b = await attendence.find({ Class: a[0].Studentclass });
  console.log("bbbbbbbb");
  
console.log(b);

  let c = b[0].Attendencelist[mounthindex]
  console.log("ppppzppzp");

  console.log(c);

  let d = c[monthName].map((val, ind) => {
    let record = val.Attendence.find((val2, ind2) => {
      return val2.id == a[0]._id;
    });

    console.log(record);

    return {
      data: record,
      Date: val.Date,
    };
  });

  console.log(d);
  let e=d.filter((val,ind)=>{
         return val.data!==undefined
  })
  console.log(a);
  
  
  if (e.length==0) {
      res.status(200).json({
    status: 200,
    message: "Request success full",
    data: [],
    Class: a[0].Studentclass,
  });
  }
  

  res.status(200).json({
    status: 200,
    message: "Request success full",
    data: e,
    Class: a[0].Studentclass,
  });
};
