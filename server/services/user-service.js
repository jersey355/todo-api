const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
                onError(err ? err : 'Unable to login user!');
            }
        });
    }).catch((e) => {
        onError(e);
    });
};

module.exports = {
    createUser,
    loginUser,
    findUserByToken
};
