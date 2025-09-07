// /netlify/functions/get-download-link.js
const Stripe = require('stripe');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    const session_id = (event.queryStringParameters || {}).session_id;
    if (!session_id) return { statusCode: 400, body: 'Missing session_id' };

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sess = await stripe.checkout.sessions.retrieve(session_id);

    if (sess.payment_status !== 'paid') {
      return { statusCode: 200, headers: {'Content-Type':'application/json'}, body: JSON.stringify({}) };
    }

    // Token JWT valido 10 minuti
    const token = jwt.sign(
      { sid: session_id, exp: Math.floor(Date.now()/1000) + (10*60) },
      process.env.JWT_SECRET
    );

    const url = `${process.env.SITE_URL}/.netlify/functions/download-pdf?token=${encodeURIComponent(token)}`;
    return { statusCode: 200, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ url }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: 'Verification error' };
  }
};
