
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export let Payment=async(req,res)=>{
    console.log(req.body);
     try {
    const { Name, Class, Amount,Month} = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "PKR",
            product_data: {
              name: `Fee Payment - ${Name} (${Class})`,
            },
            unit_amount: Amount * 100, // cents
          },
          quantity: 1,
        },
      ],
    
      success_url: "http://localhost:5173/Student/Fee_Student",
     cancel_url: "http://localhost:3000/cancel",
       metadata: {
        Class,
        Name,
        Month,
        Amount
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }

}
