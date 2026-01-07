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

    // ✅ Fail fast if env is not loaded
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error("❌ Missing SMTP env:", {
        SMTP_HOST: !!SMTP_HOST,
        SMTP_USER: !!SMTP_USER,
        SMTP_PASS: !!SMTP_PASS,
      });
      return res.status(500).json({ error: "SMTP is not configured" });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true only for 465
      auth: { user: SMTP_USER, pass: SMTP_PASS },

      // ✅ Helps with Gmail + prevents some TLS edge cases
      requireTLS: SMTP_PORT === 587,
      tls: {
        servername: SMTP_HOST,
      },
    });

    // Optional: verifies login early (better error message)
    await transporter.verify();

    const to = process.env.SUPPORT_TO || SMTP_USER;
    const safeSubject = (subject || "Запитване от сайта").slice(0, 140);

    await transporter.sendMail({
      from: `Plamstop Website <${SMTP_USER}>`,
      to,
      replyTo: email,
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
