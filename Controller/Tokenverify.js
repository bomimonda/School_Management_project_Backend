import jwt from "jsonwebtoken";
import Teacher from "../Model/TeacherModel.js";
import Student1 from "../Model/Student.js";
import Admin from "../Model/Admin.js";
const secretKey = "Coderz";

export  async function authMiddleware(req, res, next) {
  // Get token from Authorization header
  console.log("jsjjsjsjssjjsj");
  
  const authHeader = req.headers.authorization;

  
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  
  try {
    const decoded = jwt.verify(token, secretKey); // Verify token
    console.log("decode");
    
    console.log(decoded);
     let Check= decoded.PortalID.slice(0,2)
    console.log(Check);
    let {id}=decoded

     if (Check=="TE") {
            console.log("TE");
    
    
            
            
            let a=await Teacher.find({_id:id})
            console.log(a[0]);
    
    
          
            
            // a[0]
            res.status(200).json({
                message:"Request successfull",
                role:"Teacher",
                Teacher:a[0].Name,
                id:a[0]._id,
                email:a[0].email
              
            })
            
            
        }else if(Check=="ST"){
            console.log("ST");
    let {id}=decoded
            const a = await Student1.find({_id:id})
            console.log(a);
            
             res.status(200).json({
                message:"Request successfull",
                role:"Student",
                Teacher:a[0].Student,
                id:a[0]._id,
                email:a[0].Data[0].email
              
            })
            

    
            
          
    
        }else if(Check=="AD"){
               console.log("AOOAOOAOAOOAOOAO");
               
            
            let a=await Admin.find({_id:id})
            // console.log(a[0]);
    
               console.log("ppppp");
               
             console.log(a);
             
            
            // a[0]
            res.status(200).json({
                message:"Request successfull",
                role:"Admin",
                Teacher:a[0].name,
                id:a[0]._id,
                email:a[0].email
              
            })
            

        }
    
    // req.user = decoded; // Attach decoded info to request
    // next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}