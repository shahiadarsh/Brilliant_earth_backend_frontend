import express from 'express';
import dotenv from 'dotenv';

// Load environment variables immediately
dotenv.config();

import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import globalErrorHandler from './middleware/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import ringRoutes from './routes/ringRoutes.js';
import diamondRoutes from './routes/diamondRoutes.js';
import gemstoneRoutes from './routes/gemstoneRoutes.js';
import jewelryRoutes from './routes/jewelryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bulkUploadRoutes from './routes/bulkUploadRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Connect to Database
connectDB();

console.log('--- DEBUG ENVIRONMENT ---');
console.log('AWS_ACCESS_KEY_ID loaded:', process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID.substring(0, 5) + '...' : 'UNDEFINED');
console.log('--- DEBUG ENVIRONMENT ---');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Static files for temp uploads (if needed)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rings', ringRoutes);
app.use('/api/v1/diamonds', diamondRoutes);
app.use('/api/v1/gemstones', gemstoneRoutes);
app.use('/api/v1/jewelry', jewelryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/bulk-upload', bulkUploadRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/promos', promoRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/api/v1/settings', settingRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Ritzin API (JavaScript Edition)',
        status: 'Server is running smoothly',
        documentation: 'API documentation coming soon'
    });
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// 404 Handler - This catches everything that didn't match the routes above
app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Global Error Handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\x1b[36m🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}\x1b[0m`);
});
