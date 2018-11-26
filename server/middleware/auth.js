const userService = require('../services/user-service');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    userService.findByToken(token,
        (user) => {
            req.user = user;
            req.token = token;
            next();
        },
        (error) => res.status(401).send(error));
};

module.exports = { authenticate };