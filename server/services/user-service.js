const { User } = require('../models/user');

var createUser = (userData, onSuccess, onError) => {
    var user = new User(userData);
    user.save().then(() => {
        return user.generateAuthToken();
    }, (e) => {
        onError(e);
    }).then((token) => {
        onSuccess(user, token);
    });
};

module.exports = {
    createUser
};
