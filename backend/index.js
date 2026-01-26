import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './public/config/db.js';
import globalErrorHandler from './public/middleware/errorMiddleware.js';

// Pillar 1: Public Routes (Browsing, Catalog, Search)
import publicCatalogRoutes from './public/routes/catalogRoutes.js';
import publicSearchRoutes from './public/routes/searchRoutes.js';
import newsletterRoutes from './public/routes/newsletterRoutes.js';
import blogRoutes from './public/routes/blogRoutes.js';
import authRoutes from './public/routes/authRoutes.js';
import promoRoutes from './public/routes/promoRoutes.js';

// Pillar 2: User Routes (Cart, My Orders, Profile, Products)
import userOrderRoutes from './user/routes/orderRoutes.js';
import userCartRoutes from './user/routes/cartRoutes.js';
import userWishlistRoutes from './user/routes/wishlistRoutes.js';
import userProductRoutes from './user/routes/productRoutes.js';
import userContentRoutes from './user/routes/contentRoutes.js';

// Pillar 3: Admin Routes (Inventory, Management, Stats)
import adminManagementRoutes from './admin/routes/managementRoutes.js';
import adminProductRoutes from './admin/routes/productRoutes.js';
import adminOrderRoutes from './admin/routes/orderRoutes.js';
import bulkUploadRoutes from './admin/routes/bulkUploadRoutes.js';
import settingRoutes from './admin/routes/settingRoutes.js';
import uploadImageRoutes from './admin/routes/uploadRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Static files - Separated Structure
app.use('/public/admin', express.static('public/admin')); // Static assets
app.use('/public/user', express.static('public/user'));   // Static assets
app.use('/uploads', express.static('public/uploads'));

// --- API ROUTES ---

// 1. PUBLIC PILLAR (Common routes)
app.use('/api/v1', publicCatalogRoutes);
app.use('/api/v1/public/search', publicSearchRoutes);
app.use('/api/v1/public/newsletters', newsletterRoutes);
app.use('/api/v1/public/blogs', blogRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/public/promos', promoRoutes);

// Public content routes (categories, filters, pages)
app.use('/api/v1', userContentRoutes);

// 2. USER PILLAR
app.use('/api/v1/user/orders', userOrderRoutes);
app.use('/api/v1/user/cart', userCartRoutes);
app.use('/api/v1/user/wishlist', userWishlistRoutes);

// User product routes (public access)
app.use('/api/v1/products', userProductRoutes);

// 3. ADMIN PILLAR
app.use('/api/v1/admin/management', adminManagementRoutes);
app.use('/api/v1/admin', adminProductRoutes);
app.use('/api/v1/admin/orders', adminOrderRoutes);
app.use('/api/v1/admin/bulk-upload', bulkUploadRoutes);
app.use('/api/v1/admin/settings', settingRoutes);
app.use('/api/v1/admin/upload', uploadImageRoutes);

// Basic Health & Welcome
app.get('/', (req, res) => res.json({ message: 'Ritzin API - Three Folder Pillar Architecture' }));
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// 404 & Error Handling
app.use((req, res) => res.status(404).json({ status: 'fail', message: `Route ${req.originalUrl} not found` }));
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
