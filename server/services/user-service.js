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

var findByToken = (token, onSuccess, onError) => {
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject('User not found!');
        }
        onSuccess(user);
    }).catch((e) => {
        onError(e);
    });

};

module.exports = {
    createUser,
    findByToken
};
