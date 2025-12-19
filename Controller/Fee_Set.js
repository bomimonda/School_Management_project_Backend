import Fees from "../Model/Fee.js";
import Student1 from "../Model/Student.js";

export let Fee_Add = async (req, res) => {
  // console.log(req.body);
  let { Class, Fee_Type, Amount, Payment_Date, Payment_Method } = req.body;

  // console.log(a);
  // let {Fee_Type,Amount,Payment_Date,Payment_Method}=a.data[0]




   

    const months = Array.from({ length: 12 }, (_, i) => 
  new Date(0, i).toLocaleString("en", { month: "long" })
)

let P=months.map((val,ind) => {
    
    
    return {[val]:[]}
})

  let b = await Student1.find({ Studentclass: Class }).lean();
  // console.log(b);
  if (b.length > 0) {
    let Se = await Fees.find({ Class });
    if (Se.length == 0) {


      let c = b.map((val, ind) => {
        return {
          ...val,
          Fee_Type,
          Amount,
          Payment_Date,
          Payment_Method,
          Status: "Pending",
        };
      });
      console.log(c);
      let e = b.map((val, ind) => {
        return { Studentid: val._id, Status: "pending" };
      });

            let d = await Fees.insertOne({
        Class: Class,
        data: [
          {
            Fee_Type,
            Amount,
            Payment_Date,
            Payment_Method,
            Mounth:P,
            Studentinfo: e,
          },
        ],
      });

      res.status(200).json({
        data: c,
        message: "Request Success Fully",
      });
    } else {
      let e = b.map((val, ind) => {
        return { Studentid: val._id, Status: "pending" };
      });
      console.log("e");
      
console.log(e);

      // let d = await Fees.updateOne(
      //   { Class },
      //   {
      //     Class: Class,
      //     data: [
      //       {
      //         Fee_Type,
      //         Amount,
      //         Payment_Date,
      //         Payment_Method,
      //         Studentinfo: e,
      //       },
      //     ],
      //   }
      // );







      let d = await Fees.updateOne(
  {Class},
  {
    $set: {
      "data.$[].Fee_Type": Fee_Type,
      "data.$[].Amount": Amount,
      "data.$[].Payment_Date": Payment_Date,
      "data.$[].Payment_Method": Payment_Method,
      "data.$[].Mounth":P
    }
  }
);

      // console.log("SOOOOORORRORY");
      let Mp=await Fees.find({Class})
      console.log("MP");
    console.log(JSON.stringify(Mp, null, 2));

      
      console.log(Mp[0].data[0].Studentinfo);
      


      console.log("Fee record added successfully");
       let c = b.map((val, ind) => {

       
            return {
          ...val,
          Fee_Type,
          Amount,
          Payment_Date,
          Payment_Method,
          Status: Mp[0].data[0].Studentinfo[ind].Status,
        };
        
      
      });


      console.log("c");
      console.log(c);
      
      
        res.status(200).json({
        data: c,
        message: "Request Success Fully",
      });
    }
  } else {
    res.status(200).json({
      data: [],
      message: "Request Success Fully",
    });
  }
};
