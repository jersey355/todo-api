const { User } = require('../models/user');

var create = (userData, onSuccess, onError) => {
    var user = new User(userData);
    user.save().then((doc) => {
        onSuccess(doc);
    }, (e) => {
        onError(e);
    });
};

module.exports = {
    create
};
