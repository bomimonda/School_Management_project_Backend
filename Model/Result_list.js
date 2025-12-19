import mongoose from "mongoose";

let Resultlist = new mongoose.Schema({
  Class: { type: String, required: true },
  Subjects: [
    {
      name: String,
      total: Number,
    },
  ],
  Result: [
    {
      Exam: String,
      Data: [
        {
          Studentid: String,
          Marks: [
            {
              subject: String,
              marks: String,
            },
          ],
        },
      ],
    },
  ],
});

export default mongoose.model("result", Resultlist);
