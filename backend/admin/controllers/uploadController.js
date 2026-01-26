import asyncHandler from 'express-async-handler';

export const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload a file');
    }

    res.status(200).json({
        success: true,
        url: req.file.location, // multer-s3 adds 'location' field for the S3 URL
        key: req.file.key
    });
});
