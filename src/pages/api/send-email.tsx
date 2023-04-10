import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'mail.dksmarthome.dk',
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `${name} <${email}>`,
      to: 'andbrobet@gmail.com',
      subject: 'New message from your website',
      text: message,
    });

    console.log('Message sent: %s', info.messageId);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
}