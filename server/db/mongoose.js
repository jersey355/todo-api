var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set up built-in promise lib
mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true });

module.exports = { mongoose };
