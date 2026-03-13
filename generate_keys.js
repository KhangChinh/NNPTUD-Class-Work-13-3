const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

fs.writeFileSync(path.join(__dirname, 'keys', 'private.key'), privateKey);
fs.writeFileSync(path.join(__dirname, 'keys', 'public.key'), publicKey);

console.log('RSA key pair generated successfully.');
