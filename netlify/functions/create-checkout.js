// /netlify/functions/create-checkout.js
const Stripe = require("stripe");

exports.handler = async () => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "czk",
            product_data: {
              name: "Guida PDF: Come comprare casa in Italia in 7 step",
            },
            unit_amount: 9900, // 99.00 CZK
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.SITE_URL}/grazie/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/come-comprare-casa-7-step/`,
    });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "Checkout error" };
  }
};
