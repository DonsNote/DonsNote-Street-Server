"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Configure your email service here
// You should use environment variables for sensitive information like user and pass
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.example.com', // e.g., 'smtp.gmail.com' for Gmail
    port: 587, // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your_email@example.com', // Your email address
        pass: 'your_email_password', // Your email password or app-specific password
    },
});
const sendEmail = async (options) => {
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
    }
    catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
exports.sendEmail = sendEmail;
