const _ = require('lodash');
const taskController = require('../controllers/task-controller');
const { authenticate } = require('../middleware/auth');

module.exports = (app) => {

    app.get('/tasks', authenticate, (req, res) => {
        taskController.listTasks(req.user._id,
            (tasks) => res.send({ tasks }),
            (error) => res.status(400).send(error)
        );
    });

    app.get('/tasks/:id', authenticate, (req, res) => {
        var taskId = req.params.id;
        taskController.findTask(taskId, req.user._id,
            (task) => res.send({ task }),
            () => res.status(404).send(`ID [${taskId}] not found!`),
            (error) => res.status(400).send(error)
        );
    });

    app.post('/tasks', authenticate, (req, res) => {
        var taskData = _.pick(req.body, ['text', 'completed', 'completedAt']);
        taskData.ownerId = req.user._id;
        taskController.createTask(taskData,
            (task) => res.send({ task }),
            (error) => res.status(400).send(error)
        );
    });

    app.delete('/tasks/:id', authenticate, (req, res) => {
        var taskId = req.params.id;
        taskController.deleteTask(taskId, req.user._id,
            (task) => res.send({ task }),
            () => res.status(404).send(`ID [${taskId}] not found!`),
            (error) => res.status(400).send(error)
        );
    });

    app.patch('/tasks/:id', authenticate, (req, res) => {
        var taskId = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);
        taskController.updateTask(taskId, req.user._id, body,
            (task) => res.send({ task }),
            () => res.status(404).send(`ID [${taskId}] not found!`),
            (error) => res.status(400).send(error)
        );
    });

}