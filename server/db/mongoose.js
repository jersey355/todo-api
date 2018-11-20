var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set up built-in promise lib
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = { mongoose };
