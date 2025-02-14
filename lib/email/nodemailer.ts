"use server";

import { Models } from "node-appwrite";
import nodemailer from "nodemailer";
import { emailVerification } from "./templates";

// Environment variables for email credentials

const EMAIL_USER = `${process.env.GMAIL_USER}`;
const EMAIL_PASS = `${process.env.GMAIL_PASSWORD}`;



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});


export const sendVerificationEmail = async (userId: string, secret: string, user: Models.Document) => {

  const verificationLink = `${process.env
    .NEXT_PUBLIC_URL!}/profile?userId=${userId}&secret=${secret}`;
  
  const mailOptions = {
    from: EMAIL_USER,
    to: user.email,
    subject: "FairLove: Verify Your Email Address",
    html: emailVerification(verificationLink),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
};

