import Teacher from "../Model/TeacherModel.js";
import Student1 from "../Model/Student.js";
import Admin from "../Model/Admin.js";
import jwt from "jsonwebtoken"


export let Teacherfilter=async(req,res)=>{
    console.log(req.body);
    let{portalId, email}=req.body
    let Check=portalId.slice(0,2)
    console.log(Check);
    
    if (Check=="TE") {
        console.log("TE");


        
        
        let a=await Teacher.find({PortalID:portalId,email})
        console.log(a[0]);


        let Token=jwt.sign({
             id:a[0]._id,
             PortalID:a[0].PortalID
        },
           "Coderz",
           {expiresIn:"7d"}
    )
        console.log("Token");
        
        console.log(Token);
        
        // a[0]
        res.status(200).json({
            message:"Request successfull",
            role:"Teacher",
            Teacher:a[0].Name,
            id:a[0]._id,
            Token:Token
            // token: await Teacher.Token()
        })
        
        
    }else if(Check=="ST"){
        console.log("ST");

        let Check=portalId.slice(0,2)
    console.log(Check)

        const a = await Student1.findOne({
  "Data.email": email,
  "Data.PortalID": portalId
});

console.log(a);


 let Token=jwt.sign({
             id:a._id,
             PortalID:a.Data[0].PortalID
        },
           "Coderz",
           {expiresIn:"7d"}
    )
        console.log("Token");
        
        console.log(Token);

  res.status(200).json({
            message:"Request successfull",
            role:"Student",
            Teacher:a.Student,
            id:a._id,
            Token:Token
            // token: await Teacher.Token()
        })

console.log("Student");


console.log(a);

        
        //  let a=await Student1.find(portalId,email)
        // console.log(a);

    }


    else if(Check=="AD"){
        console.log("AD");

        let Check=portalId.slice(0,2)
    console.log(Check)

        const a = await Admin.findOne({
  email: email,
  
portalId: portalId
});

console.log(a);


 let Token=jwt.sign({
             id:a._id,
             
PortalID:a.portalId
        },
           "Coderz",
           {expiresIn:"7d"}
    )
        console.log("Token");
        
        console.log(Token);

  res.status(200).json({
            message:"Request successfull",
            role:"Admin",
            Teacher:a.name,
            id:a._id,
            Token:Token
            // token: await Teacher.Token()
        })

console.log("Admin");


console.log(a);

        
        //  let a=await Student1.find(portalId,email)
        // console.log(a);

    }
    

}