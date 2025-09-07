// /netlify/functions/download-pdf.js
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  const token = (event.queryStringParameters || {}).token;
  if (!token) return { statusCode: 400, body: 'Missing token' };

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return { statusCode: 401, body: 'Invalid or expired token' };
  }

  try {
    const filePath = path.join(__dirname, '..', 'private', 'guida_7_step.pdf');
    const file = fs.readFileSync(filePath);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Come_comprare_casa_in_Italia_7_step.pdf"',
        'Cache-Control': 'no-store'
      },
      body: file.toString('base64'),
      isBase64Encoded: true
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: 'Download error' };
  }
};
