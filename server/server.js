require('./config/config');

const _ = require('lodash');
const express = require('express');
const parser = require('body-parser');
const Task = require('./models/task');
const User = require('./models/user');

const port = process.env.PORT;

var app = express();
app.use(parser.json());

// <<<<<<<<<< USER ROUTES >>>>>>>>>>

app.post('/users', (req, res) => {
    var userData = _.pick(req.body, ['email', 'password']);
    User.create(userData,
        (user) => res.send({ user }),
        (error) => res.status(400).send(error)
    );
});

// <<<<<<<<<< TASK ROUTES >>>>>>>>>>

app.get('/tasks', (req, res) => {
    Task.list(
        (tasks) => res.send({ tasks }),
        (error) => res.status(400).send(error)
    );
});

app.get('/tasks/:id', (req, res) => {
    var id = req.params.id;
    Task.findById(id,
        (task) => res.send({ task }),
        () => res.status(404).send(`ID [${id}] not found!`),
        (error) => res.status(400).send(error)
    );
});

app.post('/tasks', (req, res) => {
    var taskData = _.pick(req.body, ['text', 'completed', 'completedAt']);
    Task.create(taskData,
        (task) => res.send({ task }),
        (error) => res.status(400).send(error)
    );
});

app.delete('/tasks/:id', (req, res) => {
    var id = req.params.id;
    Task.deleteById(id,
        (task) => res.send({ task }),
        () => res.status(404).send(`ID [${id}] not found!`),
        (error) => res.status(400).send(error)
    );
});

app.patch('/tasks/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    Task.updateById(id, body,
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