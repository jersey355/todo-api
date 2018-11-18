const express = require('express');
const parser = require('body-parser');
const task = require('./models/task');
//const user = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();
app.use(parser.json());

app.get('/tasks', (req, res) => {
    task.list(
        (tasks) => res.send({ tasks }),
        (error) => res.status(400).send(error)
    );
});

app.get('/tasks/:id', (req, res) => {
    task.findById(req.params.id,
        (tasks) => res.send(tasks),
        () => res.status(404).send(`ID [${req.params.id}] not found!`),
        (error) => res.status(400).send(error)
    );
});

app.put('/tasks', (req, res) => {
    var newTask = req.body;
    task.create(newTask.text, newTask.completed, newTask.completedAt,
        (doc) => res.send(doc),
        (error) => res.status(400).send(error)
    );
});

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Listening on port [${port}] ...`);
    });
}

module.exports = { app };