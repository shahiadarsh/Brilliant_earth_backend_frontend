import asyncHandler from 'express-async-handler';
import User from '../../public/models/userModel.js';

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Admin
export const getAllUsers = asyncHandler(async (req, res) => {
    const { search } = req.query;
    let query = {};

    if (search) {
        query.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    const users = await User.find(query).sort('-createdAt');
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// @desc    Update user role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Admin
export const updateUserRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.role = req.body.role || user.role;
        const updatedUser = await user.save();
        res.json({
            success: true,
            data: updatedUser
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user
// @route   DELETE /api/v1/admin/users/:id
// @access  Admin
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({
            success: true,
            message: 'User removed'
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
