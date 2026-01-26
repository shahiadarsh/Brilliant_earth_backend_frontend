import router from './routes/categoryRoutes.js';
import fs from 'fs';
const log = `Category routes imported successfully\nRouter stack: ${JSON.stringify(router.stack.map(r => r.route?.path))}\n`;
fs.writeFileSync('test_output.txt', log);
process.exit(0);
