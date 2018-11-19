const express = require('express');
const parser = require('body-parser');
const Task = require('./models/task');
//const user = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();
app.use(parser.json());

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
    var newTask = req.body;
    Task.create(newTask.text, newTask.completed, newTask.completedAt,
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

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Listening on port [${port}] ...`);
    });
}

module.exports = { app };