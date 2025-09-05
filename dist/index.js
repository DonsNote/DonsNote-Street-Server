"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables first
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const artist_router_1 = __importDefault(require("./routers/artist.router"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const busking_router_1 = __importDefault(require("./routers/busking.router"));
const report_router_1 = __importDefault(require("./routers/report.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../public')));
// API Routes
app.use('/auth', auth_router_1.default);
app.use('/users', user_router_1.default);
app.use('/artists', artist_router_1.default);
app.use('/buskings', busking_router_1.default);
app.use('/reports', report_router_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'DonsNote-Street Server',
        version: '2.0.0'
    });
});
// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src/index.html'));
});
// Policy endpoint
app.get('/policy', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src/policy.html'));
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        timestamp: new Date().toISOString()
    });
});
// Error handler
app.use((err, req, res, next) => {
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
exports.default = app;
