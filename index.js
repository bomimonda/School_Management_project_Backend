import express from "express"

import cors from "cors"
import mongoose from "mongoose"
import route from "./Routes/Route.js"
import Stripe from "stripe"
// import { Client, LocalAuth } from 'whatsapp-web.js';
// import qrcode from 'qrcode-terminal';
import { Whatsappstartboat } from "./Controller/Whatsapp.js"
let app=express()
let url=`mongodb://localhost:27017/School`


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// app.use(express.json())

// Whatsappstartboat()


app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Webhook signature failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { Class, Name, Month } = session.metadata;

      console.log(`✅ Payment successful for ${Name} (${Month})`);

    //   // 👇 Yahan apni MongoDB Fee collection update karo
    //   await Fees.updateOne(
    //     { Class: className },
    //     {
    //       $set: {
    //         [`data.0.Mounth.${month}.$[elem].Status`]: "Paid",
    //       },
    //     },
    //     {
    //       arrayFilters: [{ "elem.Studentid": studentId }],
    //     }
    //   );
    }

    res.json({ received: true });
  }
);



app.use(cors());
app.use(express.json());
app.use("/", route);



mongoose.connect(url).then(()=>{
console.log("Server Connect");

app.listen(2000,()=>{
    console.log("server run");
    
})
}).catch((error)=>{
console.log(error);

})






