

export const emailVerification = (verificationLink: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FairLove: Verify Your Email</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px; }
      .container { max-width: 500px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin: auto; padding: 20px; }
      .btn { background-color: #fce7f3; color: #e11d48; padding: 12px 20px; text-decoration: none; font-size: 18px; font-weight: bold; border-radius: 5px; display: inline-block; margin-top: 15px; }
      .footer { margin-top: 20px; font-size: 12px; color: #888; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Verify Your Email</h2>
      <p>Click the button below to verify your email address:</p>
      <a href="${verificationLink}" class="btn">Verify Email</a>
      <p>If you did not request this, please ignore this email.</p>
      <p class="footer">© 2025 FairLove. All rights reserved.</p>
    </div>
  </body>
  </html>
`;
