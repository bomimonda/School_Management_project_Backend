import Student1 from "../Model/Student.js";
import Fees from "../Model/Fee.js";

export let Class_Name = async (req, res) => {
  console.log(req.body);
  let { Class, reason } = req.body;
  if (reason == "Student") {
    let am = await Student1.find({ Studentclass: Class });
    // console.log(am);
    res.status(200).json({
      data: am,
      message: "Request success fully",
    });
  } else {
    let Fee = await Fees.find({ Class }).lean();
    console.log("ppppp");

    // console.log(Fee);
    JSON.stringify(Fee, null, 2)
    console.log(Fee)
    
    if (Fee.length > 0) {
      let { Fee_Type, Amount, Payment_Date, Payment_Method,Status } = Fee[0].data[0];
      console.log(Fee_Type);
      console.log(Amount);
      console.log(Payment_Date);
      console.log(Payment_Method);
      console.log(Status);
      
      
      
      
      
      let b = await Student1.find({ Studentclass: Class }).lean();
      
      
       let g=Status==undefined?"Prnding":Status
      if (b.length > 0) {
        let c = b.map((val, ind) => {
         
          return {
            ...val,
            Fee_Type,
            Amount,
            Payment_Date,
            Payment_Method,
            Status:g,
          };
        });

        res.status(200).json({
          data: c,
          message: "Request Success Fully",
        });
      }else{
                res.status(200).json({
          data: [],
          message: "Request Success Fully",
        });
      }
    }
     else {
        console.log("hhhhhhhhhhhhpppp");
        
        res.status(200).json({
          data: [],
          message: "Request Success Fully",
        });
      }
  }
  // let am=await Student1.find({Studentclass:Class})
  // console.log(am);
  // res.status(200).json({
  //     data:am,
  //     message:"Request success fully",

  // })
};
