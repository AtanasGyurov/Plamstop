// backend/routes/contact.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // 465 = true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.SUPPORT_TO || process.env.SMTP_USER;

    const safeSubject = (subject || "Запитване от сайта").slice(0, 140);

    await transporter.sendMail({
      from: `Plamstop Website <${process.env.SMTP_USER}>`,
      to,
      replyTo: email, // ✅ so you can reply directly to the customer
      subject: `📩 ${safeSubject}`,
      text:
        `Име: ${name}\n` +
        `Имейл: ${email}\n` +
        `Тема: ${safeSubject}\n\n` +
        `Съобщение:\n${message}\n`,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Contact email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
