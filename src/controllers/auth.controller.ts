import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { sendEmail } from "../services/email.service"; // Import sendEmail

// In-memory store for verification codes (for demonstration purposes only)
const verificationCodes: Map<string, string> = new Map();

export const authController = {
    handleAuth: async (req: Request, res: Response) => {
        const { provider } = req.body;

        if (!provider) {
            return res.status(400).json({ message: 'Provider is required' });
        }

        try {
            let result;

            switch (provider) {
                case 'local':
                    result = await authService.handleLocalSignup(req.body);
                    break;

                case 'apple':
                    result = await authService.handleAppleSignup(req.body);
                    break;

                case 'google':
                    result = await authService.handleGoogleSignup(req.body);
                    break;

                default:
                    return res.status(400).json({ message: 'Unsupported provider' });
            }
            return res.status(200).json(result);

        }

        catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // New method to send verification code
    sendVerificationCode: async (req: Request, res: Response) => {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const code = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit code
        verificationCodes.set(email, code); // Store code in memory

        try {
            const emailSent = await sendEmail({
                to: email,
                subject: 'DonsNote-Street 이메일 인증 코드',
                text: `인증 코드는 ${code} 입니다.`,
                html: `<b>인증 코드는 ${code} 입니다.</b>`,
            });

            if (emailSent) {
                console.log(`Verification code ${code} sent to ${email}`);
                return res.status(200).json({ message: 'Verification code sent.' });
            } else {
                return res.status(500).json({ message: 'Failed to send verification code.' });
            }
        } catch (error) {
            console.error('Error sending verification email:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // New method to verify email code
    verifyEmailCode: async (req: Request, res: Response) => {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: 'Email and code are required' });
        }

        const storedCode = verificationCodes.get(email);

        if (storedCode && storedCode === code) {
            verificationCodes.delete(email); // Code used, remove from memory
            return res.status(200).json({ message: 'Email verified successfully.' });
        } else {
            return res.status(400).json({ message: 'Invalid verification code.' });
        }
    },
};