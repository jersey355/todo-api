const { mongoose } = require('../db/mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

var create = (userData, onSuccess, onError) => {
    var user = new User(userData);
    user.save().then((doc) => {
        onSuccess(doc);
    }, (e) => {
        onError(e);
    });
};

module.exports = {
    User,
    create
};
