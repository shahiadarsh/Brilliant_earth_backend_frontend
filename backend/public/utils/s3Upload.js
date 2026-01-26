import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

import fs from 'fs';

console.log('--- S3 UPLOAD DEBUG ---');
const debugMsg = `
Time: ${new Date().toISOString()}
AWS_ACCESS_KEY_ID: ${process.env.AWS_ACCESS_KEY_ID ? 'Loaded (' + process.env.AWS_ACCESS_KEY_ID.length + ' chars)' : 'MISSING'}
AWS_SECRET_ACCESS_KEY: ${process.env.AWS_SECRET_ACCESS_KEY ? 'Loaded (' + process.env.AWS_SECRET_ACCESS_KEY.length + ' chars)' : 'MISSING'}
AWS_REGION: ${process.env.AWS_REGION || 'DEFAULT (ap-south-1)'}
`;
console.log(debugMsg);
try { fs.appendFileSync('debug_s3_log.txt', debugMsg); } catch (e) { }
console.log('--- S3 UPLOAD DEBUG ---');

const s3 = new S3Client({
    region: process.env.AWS_REGION || 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID.trim() : undefined,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY.trim() : undefined
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME || 'ritzin-media',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1];
            cb(null, `products/${Date.now().toString()}-${file.originalname}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload only images.'), false);
        }
    }
});

export default upload;
