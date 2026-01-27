import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload a file');
    }

    res.status(200).json({
        success: true,
        url: req.file.path, // Cloudinary uses 'path' for the secure URL
        key: req.file.filename // Cloudinary uses 'filename' for public_id
    });
});
