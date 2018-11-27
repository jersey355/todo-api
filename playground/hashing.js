//const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data = { id: 10 };
var token = jwt.sign(data, '123abc');
console.log(`token: ${token}`);

var decoded = jwt.verify(token, '123abc');
console.log(`decoded: ${JSON.stringify(decoded)}`);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// BCRYPT SAMPLE
var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPwd = '$2a$10$gx57UzMwgcguBiNHU7jey.qjDv7W7fZLVq293mzUFl9yI6xVGYXm.';

bcrypt.compare(password, hashedPwd, (err, res) => {
    console.log(res);
});