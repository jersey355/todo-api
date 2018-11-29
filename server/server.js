require('./config/config');

const _ = require('lodash');
const express = require('express');
const parser = require('body-parser');
const taskService = require('./services/task-service');
const userService = require('./services/user-service');
const { authenticate } = require('./middleware/auth');

const port = process.env.PORT;

var app = express();
app.use(parser.json());

// <<<<<<<<<< USER ROUTES >>>>>>>>>>

app.post('/users', (req, res) => {
    var credentials = _.pick(req.body, ['email', 'password']);
    userService.createUser(credentials,
        (user, token) => {
            res.setHeader('x-auth', token);
            res.send({ user });
        },
        (error) => res.status(400).send(error)
    );
});

app.post('/users/login', (req, res) => {
    var credentials = _.pick(req.body, ['email', 'password']);
    userService.loginUser(credentials,
        (user, token) => res.header('x-auth', token).send({ user }),
        (error) => res.status(400).send(error)
    );
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {
    userService.deleteUserToken(req.user, req.token, () => {
        res.status(200).send();
    }, (error) => {
        res.status(400).send(error);
    });
});

// <<<<<<<<<< TASK ROUTES >>>>>>>>>>

app.get('/tasks', (req, res) => {
    taskService.listTasks(
        (tasks) => res.send({ tasks }),
        (error) => res.status(400).send(error)
    );
});

app.get('/tasks/:id', (req, res) => {
    var id = req.params.id;
    taskService.findTask(id,
        (task) => res.send({ task }),
        () => res.status(404).send(`ID [${id}] not found!`),
        (error) => res.status(400).send(error)
    );
});

app.post('/tasks', (req, res) => {
    var taskData = _.pick(req.body, ['text', 'completed', 'completedAt']);
    taskService.createTask(taskData,
        (task) => res.send({ task }),
        (error) => res.status(400).send(error)
    );
});

app.delete('/tasks/:id', (req, res) => {
    var id = req.params.id;
    taskService.deleteTask(id,
        (task) => res.send({ task }),
        () => res.status(404).send(`ID [${id}] not found!`),
        (error) => res.status(400).send(error)
    );
});

app.patch('/tasks/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    taskService.updateTask(id, body,
        (task) => res.send({ task }),
        () => res.status(404).send(`ID [${id}] not found!`),
        (error) => res.status(400).send(error)
    );
});

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Listening on port [${port}] ...`);
    });
}

module.exports = { app };