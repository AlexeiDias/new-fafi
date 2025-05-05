import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_EMAIL_PASSWORD,
  },
});

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const sendAlert = async (bill) => {
  const { name, dueDate, amount, email, phone } = bill;

  const message = `💸 Reminder: ${name} is due on ${new Date(dueDate).toLocaleDateString()} for $${amount}`;

  // 📧 Email
  if (email) {
    await transporter.sendMail({
      from: `"FAFI Alerts" <${process.env.ALERT_EMAIL}>`,
      to: email,
      subject: `Bill Due Reminder: ${name}`,
      text: message,
    });
    console.log(`📧 Email sent to ${email}`);
  }

  // 📲 SMS
  if (phone) {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
    console.log(`📲 SMS sent to ${phone}`);
  }
};

export default sendAlert;
