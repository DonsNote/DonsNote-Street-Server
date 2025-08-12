import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();


/* -- POST -- */

/* Signup */
router.post('/', authController.handleAuth);

// New routes for email verification
router.post('/send-verification-code', authController.sendVerificationCode);
router.post('/verify-email-code', authController.verifyEmailCode);

export default router;