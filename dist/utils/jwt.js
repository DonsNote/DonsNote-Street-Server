"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'fallback-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'fallback-refresh-secret';
function generateAccessToken(payload) {
    // 하위 호환성을 위해 number 타입도 지원
    const tokenPayload = typeof payload === 'number'
        ? { userId: payload }
        : payload;
    return jsonwebtoken_1.default.sign(tokenPayload, ACCESS_SECRET, { expiresIn: '3d' });
}
function generateRefreshToken(payload) {
    // 하위 호환성을 위해 number 타입도 지원
    const tokenPayload = typeof payload === 'number'
        ? { userId: payload }
        : payload;
    return jsonwebtoken_1.default.sign(tokenPayload, REFRESH_SECRET, { expiresIn: '7d' });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
}
