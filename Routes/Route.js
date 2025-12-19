import { ClassDataEnter, ClassDelete, Classload, ClassUpdate } from "../Controller/ClassController.js";
import { StudentData, Studentload,StudentDelete, StudentUpdate } from "../Controller/Student.js";
import { TeacherData, teacherload,TeacherDelete, TeacherUpdate } from "../Controller/TeacherController.js";
import { Teacherfilter } from "../Controller/Rolefilter.js";
import {authMiddleware} from "../Controller/Tokenverify.js"
import { Attendence1 } from "../Controller/Attendence.js";
import {AttendenceSheet} from "../Controller/Attendence.js";
import { AttendenceGet } from "../Controller/Attendence.js";
import { Subject_list,Student_Result,Student_Result_id} from "../Controller/Result.js";
import { Student_Attendence } from "../Controller/Student_Attendence.js";
import { Class_Name } from "../Controller/Classfilter.js";
import express from "express"
import { attendence_Message } from "../Controller/Whatsapp.js";
import { Fee_Add } from "../Controller/Fee_Set.js";
import {feefilter} from "../Controller/Feedatafilter.js"
import { Payment } from "../Controller/Payment.js";
let route=express.Router()
route.post("/Class_Filter",Class_Name)
route.post("/Payment",Payment)
route.post("/Fee_Add",Fee_Add)
route.post("/Feedatafilter",feefilter)
route.post("/Attendence_Message",attendence_Message)
route.post("/Student_Attendence_Get",Student_Attendence)
route.post("/AttendenceGet",AttendenceGet)
route.post("/Student_Result_id",Student_Result_id)
route.post("/Subject-list",Subject_list)
route.post("/Student-Result",Student_Result)
route.post("/Attenence_Sheet",AttendenceSheet)
route.post("/Attendence",Attendence1)
route.post("/FilterRole",Teacherfilter)
route.get("/Dashboard",authMiddleware)
route.get( "/Teacherload",teacherload)
route.get("/Studentload",Studentload)
route.get("/Classload",Classload)
route.post("/Class",ClassDataEnter)
route.post("/Teacher",TeacherData)
route.post("/Student",StudentData)

route.delete("/ClassDelete/:id",ClassDelete)
route.delete("/TeacherDelete/:id",TeacherDelete)
route.delete("/StudentDelete/:id",StudentDelete)
route.patch("/ClassUpdate/:id",ClassUpdate)
route.patch("/TeacherUpdate/:id",TeacherUpdate)
route.patch("/StudentUpdate/:id",StudentUpdate)


export default route