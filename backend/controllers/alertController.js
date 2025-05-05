import Bill from '../models/Bill.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Twilio client
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendDueAlerts = async (req, res) => {
  const today = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(today.getDate() + 7);

  const dueSoon = await Bill.find({
    dueDate: { $gte: today, $lte: weekFromNow },
  });

  let sentCount = 0;

  for (const bill of dueSoon) {
    const due = new Date(bill.dueDate).toDateString();
    const msg = `🚨 ALERT: "${bill.name}" for $${bill.amount} is due on ${due}`;
  
    console.log(`📡 Processing alert for ${bill.name}`);
    console.log(`📧 email: ${bill.email}`);
    console.log(`📲 phone: ${bill.phone}`);
  
    // EMAIL
    if (bill.email) {
      try {
        await transporter.sendMail({
          from: `"FAFI Alerts" <${process.env.EMAIL_USER}>`,
          to: bill.email,
          subject: `Bill Due Soon: ${bill.name}`,
          text: msg,
        });
        console.log("✅ Email sent to", bill.email);
      } catch (err) {
        console.error("❌ Email error:", err.message);
      }
    }
  
    // SMS
    if (bill.phone) {
      try {
        await twilioClient.messages.create({
          from: process.env.TWILIO_PHONE,
          to: bill.phone,
          body: msg,
        });
        console.log("✅ SMS sent to", bill.phone);
      } catch (err) {
        console.error("❌ SMS error:", err.message);
      }
    }
  
    sentCount++;
  }

  

  res.json({ sent: sentCount });
};
