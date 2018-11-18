var { mongoose } = require('../db/mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        default: null
    }
});

var create = (name, email, onSuccess, onError) => {

    var user = new User({ name, email });
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
