import express from 'express';
import {
    registerUser,
    loginUser,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updateUserProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
