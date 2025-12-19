import Teacher from "../Model/TeacherModel.js";
import jwt from "jsonwebtoken"



export let teacherload=async(req,res)=>{
    let a= await Teacher.find()

        res.status(200).json({
        successfull:true,
        message:"Request Successfully",
        data:a

            
        
    })
}



export let TeacherDelete=async(req,res)=>{
   
     const { id } = req.params;
    //   console.log(id);
      
    let a=await Teacher.findByIdAndDelete(id)
    console.log(a);
    res.status(200).json({
        message:"Data delete Successfully",
        data:a
    })
    
    
}


export let TeacherUpdate=async(req,res)=>{
     const { id } = req.params;
     console.log(id);
     console.log(req.body);
     let {PortalId,First,Last,email,Subject,Department,hireDate}=req.body
     let data1={
         PortalID:`TE${PortalId}`,Name:`${First} ${Last}`,email,Teacherinfo:[{Subject,Department,hireDate}]
     }

     let a=await Teacher.findByIdAndUpdate(id,data1,{ new: true })
      res.status(200).json({
        successfull:true,
        message:"Request Successfully",
        data:a



            
        
    })
console.log("hhdhdhhdhdhhd");

    console.log(a);
    

}




export let TeacherData=async(req,res)=>{
    
    let {PortalId,First,Last,email,Subject,Department,hireDate}=req.body
       let check=await Teacher.find({ PortalID:PortalId,email})

    
  
    

    if (check.length==0) {
          let data=await Teacher.insertOne({
  PortalID:`TE${PortalId}`,Name:`${First} ${Last}`,email,Teacherinfo:[{Subject,Department,hireDate}]
    })
    console.log(data);


    let Token=jwt.sign(
       
                    {
                        id:data._id,
                        Name:data.Name,
                        email:data.email
                    },
                            "Coderz",
                 { expiresIn: '7d' }
        
                
    )

    console.log(Token);
    
    
    res.status(200).json({
        successfull:true,
        message:"Request Successfully",
        data:data,
        role:"Teacher"
        

            
        
    })
    }else{
        res.status(400).json({
        successfull:false,
        message:"Data already exist",
       
    })
    }


    
    
    
}