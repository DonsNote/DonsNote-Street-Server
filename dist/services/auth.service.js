"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const supabase_1 = require("../config/supabase");
const jwt_1 = require("../utils/jwt");
exports.authService = {
    async handleLocalSignup(data) {
        if (!data.email || !data.password) {
            throw new Error('Email and password are required.');
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!data.password.match(passwordRegex)) {
            throw new Error('Password must be at least 8 characters with uppercase, digit and special character.');
        }
        // 기존 사용자 확인
        const { data: existingUser, error: findError } = await supabase_1.supabase
            .from('User')
            .select('*')
            .eq('email', data.email)
            .single();
        if (findError && findError.code !== 'PGRST116') {
            throw new Error('Database error occurred.');
        }
        if (existingUser) {
            throw new Error('User already exists with this email.');
        }
        // 비밀번호 해시
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        // 사용자 생성
        const { data: newUser, error: createError } = await supabase_1.supabase
            .from('User')
            .insert({
            email: data.email,
            password: hashedPassword,
            name: data.name || 'User',
            info: data.info || '',
            userImgURL: data.userImgURL || '/static/images/userProfile/defaultUser.jpg'
        })
            .select()
            .single();
        if (createError) {
            throw new Error('Failed to create user.');
        }
        // 토큰 생성
        const accessToken = (0, jwt_1.generateAccessToken)({ userId: newUser.id, email: newUser.email });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ userId: newUser.id, email: newUser.email });
        // Auth 테이블에 토큰 저장
        await supabase_1.supabase
            .from('Auth')
            .insert({
            uid: newUser.id,
            provider: 'local',
            acToken: accessToken,
            reToken: refreshToken
        });
        return {
            user: { id: newUser.id, email: newUser.email, name: newUser.name },
            accessToken,
            refreshToken
        };
    },
    async handleAppleSignup(data) {
        // Apple 로그인은 향후 구현 예정
        return {
            message: 'Apple signup will be implemented soon',
            data: data.authcode
        };
    },
    async handleGoogleSignup(data) {
        // Google 로그인은 향후 구현 예정
        return {
            message: 'Google signup will be implemented soon',
            data: data.accessToken
        };
    }
};
