"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
/* -- POST -- */
/* Signup */
router.post('/', auth_controller_1.authController.handleAuth);
// New routes for email verification
router.post('/send-verification-code', auth_controller_1.authController.sendVerificationCode);
router.post('/verify-email-code', auth_controller_1.authController.verifyEmailCode);
exports.default = router;
