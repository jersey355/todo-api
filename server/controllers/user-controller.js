const bcrypt = require('bcryptjs');
const { User } = require('../models/user');

var createUser = (credentials, onSuccess, onError) => {
    var user = new User(credentials);
    user.save().then(() => {
        return user.generateAuthToken();
    }, (e) => {
        onError(e);
    }).then((token) => {
        onSuccess(user, token);
    }).catch((e) => { });
};

var findUserByToken = (token, onSuccess, onError) => {
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject('User not found!');
        }
        onSuccess(user);
    }).catch((e) => {
        onError(e);
    });

};

var loginUser = (credentials, onSuccess, onError) => {
    User.findByEmail(credentials.email).then((user) => {
        bcrypt.compare(credentials.password, user.password, (err, res) => {
            if (res === true) {
                return user.generateAuthToken().then((token) => {
                    onSuccess(user, token);
                });
            } else {
                onError(err ? err : { message: 'Password mismatch' });
            }
        });
    }).catch((e) => {
        onError(e);
    });
};

var deleteUserToken = (user, token, onSuccess, onError) => {
    user.deleteToken(token).then(() => {
        onSuccess();
    }).catch((e) => onError(e.message));
};

module.exports = {
    createUser,
    loginUser,
    deleteUserToken,
    findUserByToken
};
