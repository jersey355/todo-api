const _ = require('lodash');
const userController = require('../controllers/user-controller');
const { authenticate } = require('../middleware/auth');

module.exports = (app) => {

    app.post('/users', (req, res) => {
        var credentials = _.pick(req.body, ['email', 'password']);
        userController.createUser(credentials,
            (user, token) => {
                res.setHeader('x-auth', token);
                res.send({ user });
            },
            (error) => res.status(400).send(error)
        );
    });

    app.post('/users/login', (req, res) => {
        var credentials = _.pick(req.body, ['email', 'password']);
        userController.loginUser(credentials,
            (user, token) => res.header('x-auth', token).send({ user }),
            (error) => res.status(400).send(error)
        );
    });

    app.get('/users/me', authenticate, (req, res) => {
        res.send(req.user);
    });

    app.delete('/users/me/token', authenticate, (req, res) => {
        userController.deleteUserToken(req.user, req.token, () => {
            res.status(200).send();
        }, (error) => {
            res.status(400).send(error);
        });
    });

}