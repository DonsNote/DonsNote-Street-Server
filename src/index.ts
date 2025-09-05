import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

import cors from 'cors';
import express, { Request, Response } from 'express';
import path from 'path';
import artistRouter from './routers/artist.router';
import authRouter from './routers/auth.router';
import buskingRouter from './routers/busking.router';
import reportsRouter from './routers/report.router';
import userRouter from './routers/user.router';

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/artists', artistRouter);
app.use('/buskings', buskingRouter);
app.use('/reports', reportsRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'DonsNote-Street Server',
        version: '2.0.0'
    });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

// Policy endpoint
app.get('/policy', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src/policy.html'));
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        timestamp: new Date().toISOString()
    });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
    });
});

app.listen(port, 'localhost', () => {
    console.log(`🚀 DonsServer running at http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`🗃️  Database: Supabase PostgreSQL`);
    console.log(`📱 Ready for iOS app connections!`);
});

export default app;