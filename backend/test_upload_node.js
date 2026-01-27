
import http from 'http';
import fs from 'fs';
import path from 'path';

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const filePath = '../rings_catalog_50.csv';
const resolvedPath = path.resolve(filePath);
const productType = 'ring';

if (!fs.existsSync(resolvedPath)) {
    console.error('File not found:', resolvedPath);
    process.exit(1);
}

const fileContent = fs.readFileSync(resolvedPath);
const filename = path.basename(resolvedPath);

// Construct body
let body = `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="productType"\r\n\r\n`;
body += `${productType}\r\n`;
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`;
body += `Content-Type: text/csv\r\n\r\n`;

const bodyHead = Buffer.from(body, 'utf-8');
const bodyTail = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');

const contentParams = Buffer.concat([bodyHead, fileContent, bodyTail]);

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/admin/bulk-upload',
    method: 'POST',
    headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': contentParams.length
    }
};

console.log('Sending request to', options.path);

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Response:', data);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(contentParams);
req.end();
