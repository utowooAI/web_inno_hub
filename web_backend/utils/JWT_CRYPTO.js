const crypto = require('crypto');

// 生成一个256位（32字节）的随机密钥，并转换为Base64格式
const secret = crypto.randomBytes(32).toString('base64');

console.log('Generated JWT_SECRET:', secret);