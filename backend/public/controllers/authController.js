import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// @desc    Register a new user (Request OTP)
// @route   POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
        if (user.isVerified) {
            res.status(400);
            throw new Error('User already exists and is verified. Please login.');
        }
        // If user exists but not verified, we will update their details and send a new OTP
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
    } else {
        // Create new unverified user
        user = new User({
            firstName,
            lastName,
            email,
            password
        });
    }

    // Generate 6-digit OTP
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    await user.save();

    // Send OTP via Email
    try {
        await sendEmail({
            email: user.email,
            subject: 'Verify Your Account - Brilliant Earth',
            message: `Your verification code is: ${otp}. It expires in 10 minutes.`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #163E3E; text-align: center;">Verify Your Email</h2>
                    <p>Thank you for choosing Brilliant Earth. Use the following OTP to complete your registration:</p>
                    <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #163E3E; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p style="font-size: 12px; color: #666; text-align: center;">This code will expire in 10 minutes.</p>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: 'Verification OTP sent to your email.'
        });
    } catch (error) {
        console.error('Email send failed:', error);
        res.status(500);
        throw new Error('Failed to send verification email. Please try again.');
    }
});

// @desc    Verify OTP and complete registration
// @route   POST /api/v1/auth/verify-otp
export const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({
        email,
        otp,
        otpExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Account verified successfully!',
        data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        }
    });
});

// @desc    Resend OTP
// @route   POST /api/v1/auth/resend-otp
export const resendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email, isVerified: false });

    if (!user) {
        res.status(404);
        throw new Error('No unverified account found with this email.');
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
        email: user.email,
        subject: 'Your New Verification Code',
        message: `Your new verification code is: ${otp}`
    });

    res.json({ success: true, message: 'New OTP sent to email.' });
});

// @desc    Auth user & get token
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.comparePassword(password, user.password))) {
        if (!user.isVerified) {
            res.status(401);
            throw new Error('Please verify your email first');
        }

        res.json({
            success: true,
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            }
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Forgot Password
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User with this email not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset - Brilliant Earth',
            message: `Reset your password here: ${resetUrl}`,
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
        });

        res.json({ success: true, message: 'Password reset link sent to email' });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500);
        throw new Error('Error sending reset email.');
    }
});

// @desc    Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        throw new Error('Token is invalid or has expired');
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successful.' });
});

// @desc    Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            success: true,
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            success: true,
            data: {
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
