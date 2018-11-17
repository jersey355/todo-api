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

var create = (name, email) => {

    var user = new User({ name, email });
    user.save().then((doc) => {
        return (doc);
    }, (e) => {
        throw new Error(e.message);
    });

};

module.exports = {
    //User,
    create
};