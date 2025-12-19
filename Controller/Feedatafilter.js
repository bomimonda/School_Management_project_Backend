
import Fees from "../Model/Fee.js";
export let feefilter=async(req,res)=>{
    console.log(req.body);
    let{Class}=req.body
    let Fee1=await Fees.find({Class})
    console.log("Fee1");
    
    console.log(Fee1);

    console.log(Fee1[0].data);
    let{Fee_Type,Amount,Payment_Date,Payment_Method}=Fee1[0].data[0]
    res.status(200).json({
    Fee_Type,
    Amount,
    Payment_Date,
    Payment_Method,
    Status:"Pending"
    })

}