const express = require('express');
const parser = require('body-parser');
const task = require('./models/Task');
const user = require('./models/User');

var app = express();
app.use(parser.json());

app.put('/tasks', (req, res) => {
    var newTask = req.body;
    task.create(newTask.text, newTask.completed, newTask.completedAt, (doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});

if (!module.parent) {
    app.listen(3000, () => {
        console.log('Listening on port 3000 ...');
    });
}
