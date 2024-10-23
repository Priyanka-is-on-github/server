const express = require("express");
const router = express.Router();
const pool = require("../db");
const stripe = require("stripe");
const bodyParser = require('body-parser');

// Use the raw body parser to handle the webhook request
router.post("/webhookRoute", async (req: any, res: any) => {
  console.log("webhook called");

  const sig = req.headers["stripe-signature"];
  console.log('sig=',sig)
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const session = event.data.object;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "payment_intent.requires_action") {
    const paymentIntent = event.data.object;
    console.log("Payment Intent requires action:", paymentIntent.id);
    // Implement logic for handling payment intent that requires action
  }

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      console.log(`Webhook Error: Missing metadata`);
      return res.status(400).send(`Webhook Error: Missing metadata`);
    }

    try {
      const insertPurchaseQuery = {
        text: "INSERT INTO purchase (courseid, userid) VALUES ($1, $2)",
        values: [courseId, userId],
      };

      await pool.query(insertPurchaseQuery);

      const courseChapterId = await pool.query(
        "SELECT id from chapters WHERE courseid=$1 ORDER BY id ",
        [courseId]
      );

      const insertPromises = courseChapterId.rows.map((row: { id: string }) => {
        return pool.query(
          "INSERT INTO userprogress(userid, chapterid, courseid) VALUES($1, $2,$3)",
          [userId, row?.id, courseId]
        );
      });

      await Promise.all(insertPromises);
    } catch (err: any) {
      console.log(`Database Error: ${err.message}`);
      return res.status(500).send(`Database Error: ${err.message}`);
    }
  } else {
    console.log(`Webhook Error: Unhandled event type ${event.type}`);
    return res
      .status(200)
      .send(`Webhook Error: Unhandled event type ${event.type}`);
  }

  res.status(200).send();
});

module.exports = router;
export {};
