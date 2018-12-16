const userController = require('../controllers/user-controller');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    userController.findUserByToken(token,
        (user) => {
            req.user = user;
            req.token = token;
            next();
        },
        (error) => res.status(401).send(error));
};

module.exports = { authenticate };