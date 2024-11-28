"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailTemplate = void 0;
const verifyEmailTemplate = (verificationToken) => ({
    html: `
       
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        background-color: #f9f9f9;
      }
      .header {
        text-align: center;
      }
      .header img {
        max-width: 100px;
        margin-bottom: 10px;
      }
      .content {
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        font-size: 18px;
        color: #fff;
        background-color: #007BFF;
        text-decoration: none;
        border-radius: 5px;
      }
       .button:visited {
        color: #fff; /* Change text color to white when visited */
      }
      .otp {
        background-color: #007BFF;
        font-size: 18px;
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        color: #fff;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #777;
      }
      footer {
        background-color: #161A1E;
        padding: 25px 20px;
    }
    footer hr {
        border-color: white;
        margin: 20px 0;
    }
    .socials {
        text-align: center;
    }
    .socials a { 
        margin-right: 26px;
    }
    .lower-footer {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 14px;
    }
    .lower-footer a {
        color: #FFF;
        font-size: 14px;
    }
    .icon {
        width: 150px;
        height: auto;
        margin-right: 10px;
      }
    @media (max-width: 500px) {
        h1 {
            font-size: 22px;
        }
    } 
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        
      
        <h2>Welcome to Izzy Watch Movies</h2>
      </div>
      <div class="content">
        <p>Hi there,</p>
        <p>Thank you for signing up for our service! We're excited to have you on board. Please confirm your email address using the OTP below:</p>
        <p class="otp">${verificationToken}</p>

        <a href="https://izzy-watch-movie-16.onrender.com/verify-email">Complete Email Verification</a>
        <p>Please note that this OTP is only valid for 6 hours. If you did not sign up for this account, please ignore this email or contact our support team.</p>
      </div>
      <div class="footer">
        <p>If you have any questions, feel free to reply to this email or contact our support team at support@freshfromfarm.com</p>
        <p>Best regards,<br>Izzy Watch</p>
        <div class="socials">
        <a href="">
            <img src="" alt="Facebook">
        </a>
        <a href="">
            <img src="" alt="Twitter">
        </a>
        <a href="https://instagram.com">
            <img src="" alt="Instagram">
        </a>
        <a href="https://www.linkedin.com">
            <img src="" alt="linkedin">
        </a>
    </div>
      </div>
    </div>
  </body>
  </html>
  
                `,
});
exports.verifyEmailTemplate = verifyEmailTemplate;
//# sourceMappingURL=email-verification.template.js.map