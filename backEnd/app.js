const express = require("express");
const env = require("dotenv").config();
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.SECRETKEY);
app.use(express.static("."));
app.use(express.json());
app.use(cors());

// creates customer in stripe Dashboard

//http:localhost:2000/customer POST
app.post("/customer", (req, res) => {
  let params = {};
  params.address = {
    country: req.body.country,
    city: req.body.city,
    line1: req.body.street,
    postal_code: req.body.zipcode,
  };
  params.email = req.body.email;
  params.name = `${req.body.firstname} ${req.body.lastname}`;
  params.phone = parseInt(req.body.phone);
  stripe.customers.create(params, (err, customer) => {
    if (err) {
      throw err;
    } else {
      res.json({ status: "success", body: params });
    }
  });
});

//  this going to charge customer

//http:localhost:2000/charge POST
http: app.post("/charge", (req, res, next) => {
  let amt = parseInt(req.body.price) * 100;
  let charge = stripe.charges.create(
    {
      amount: amt,
      currency: "usd",
      source: req.body.token.token.id,
    },
    (err, charge) => {
      if (err) {
        res.json({ success: false, message: "payment failed", err: err });
      } else {
        res.json({ success: true, message: "payment done" });
      }
    }
  );
});

//triggers event based on actions that's not controled by us right now i.e when the customer card declined
//charge.type will be charge.failed

//http:ngrok/webhook POST
 var event = null;
function responseFromWebHook(req, res) {
  return app.post("/webhook", (req, res, next) => {
    // console.log(req.body.type)
    event = req.body;
  });
}
responseFromWebHook();

// check the charge status and other events that happen in our stripe,i.e if the there is any payment that got into to our account the event will trigger and we will know

//http:localhost:2000/charge/status POST
 app.get("/charge/status", (req, res) => {
  res.json(event);
  if (event.type === "charge.succeeded") {
    return res.json({ status: "success" });
  }
  if (event.type === "charge.failed") {
    return res.json({ status: "failed" });
  }
  if (event.type === "payment_intent.succeeded") {
    console.log("payment From the bank to my account has been made");
  }
});

app.listen(
  process.env.PORT || 5000,
  console.log(`node is running on port ${process.env.PORT}`)
);
