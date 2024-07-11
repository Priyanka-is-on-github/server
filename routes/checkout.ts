require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");
const { JwtPayload } = require("jsonwebtoken");

async function currentUser(req: any) {
  return { id: 1, emailAddresses: [{ emailAddress: "user@example.com" }] };
}

router.post("/checkout/:courseId", async (req: any, res: any) => {
  const { courseId } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ err: "You don't have authorization to access further." });
  }

  try {
    const token = authorization.split(" ")[1];

    console.log("Authorization token:", token);

    const decoded = jwt.decode(token) as typeof JwtPayload;
    if (!decoded || !decoded.sub) {
      return res.status(401).send("Unauthorized");
    }
    console.log("after decoding token: ", decoded);

    const userid = decoded.sub;
    console.log("userid=", userid);

    const user = await currentUser(req); // Assuming you have a currentUser function

    if (
      !userid ||
      !user ||
      !user.id ||
      !user.emailAddresses?.[0]?.emailAddress
    ) {
      return res.status(401).send("Unauthorized");
    }

    const courseResult = await pool.query(
      "SELECT * FROM course WHERE id = $1 AND ispublished = true",
      [courseId]
    );

    const course = courseResult.rows[0];

    if (!course) {
      return res.status(404).send("Not found");
    }

    const purchaseResult = await pool.query(
      "SELECT * FROM purchase WHERE userid = $1 AND courseid = $2",
      [userid, courseId]
    );
    const purchase = purchaseResult.rows[0];

    if (purchase) {
      return res.status(400).send("Already purchased");
    }

    const lineItems = [
      {
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: course.title,
            description: course.description,
          },
          unit_amount: Math.max(Math.round(course.price), 50),
        },
      },
    ];

    let stripeCustomerResult = await pool.query(
      "SELECT stripe_customer_id FROM stripe_customer WHERE userid = $1",
      [userid]
    );
    let stripeCustomer = stripeCustomerResult.rows[0];

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomerResult = await pool.query(
        "INSERT INTO stripe_customer (userid, stripe_customer_id) VALUES ($1, $2) RETURNING stripe_customer_id",
        [userid, customer.id]
      );
      stripeCustomer = stripeCustomerResult.rows[0];
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripe_customer_id,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });
    

    res.json({ url: session.url }); 
  } catch (error) {
    console.error("[COURSE_ID_CHECKOUT]", error);
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
export {};
