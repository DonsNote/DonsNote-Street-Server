import nodemailer from 'nodemailer';

// Configure your email service here
// You should use environment variables for sensitive information like user and pass
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // e.g., 'smtp.gmail.com' for Gmail
  port: 587, // or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your_email@example.com', // Your email address
    pass: 'your_email_password', // Your email password or app-specific password
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: '"DonsNote-Street" <your_email@example.com>', // Sender address
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
