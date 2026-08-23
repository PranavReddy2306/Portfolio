// api/config.js
// Vercel Serverless Function to securely expose non-sensitive environment variables to the frontend.

export default function handler(request, response) {
  // Set headers to prevent caching of environment variables
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Expires', '0');

  // Return the environment variables as JSON
  response.status(200).json({
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID || '',
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || '',
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || '',
    API_URL: process.env.API_URL || ''
  });
}
