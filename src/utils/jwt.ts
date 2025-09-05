import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'fallback-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'fallback-refresh-secret';

interface JWTPayload {
    userId: number;
    email: string;
}

export function generateAccessToken(payload: JWTPayload | number) {
    // 하위 호환성을 위해 number 타입도 지원
    const tokenPayload = typeof payload === 'number' 
        ? { userId: payload } 
        : payload;
    
    return jwt.sign(tokenPayload, ACCESS_SECRET, { expiresIn: '3d' });
}

export function generateRefreshToken(payload: JWTPayload | number) {
    // 하위 호환성을 위해 number 타입도 지원
    const tokenPayload = typeof payload === 'number' 
        ? { userId: payload } 
        : payload;
    
    return jwt.sign(tokenPayload, REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_SECRET);
}