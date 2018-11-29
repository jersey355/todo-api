const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { Task } = require('../models/task');

var listTasks = (ownerId, onSuccess, onError) => {
    Task.find({ ownerId }).then((tasks) => {
        onSuccess(tasks);
    }, (e) => {
        onError(e);
    });
};

var findTask = (id, ownerId, onSuccess, onNotFound, onError) => {

    if (!ObjectID.isValid(id)) {
        return onError({ message: `ID [${id}] is invalid!` });
    }

    Task.findOne({ _id: id, ownerId }).then((task) => {
        if (task) {
            onSuccess(task);
        } else {
            onNotFound();
        }
    }, (e) => {
        onError(e);
    });

};

var createTask = (taskData, onSuccess, onError) => {
    var task = new Task(taskData);
    task.save().then((doc) => {
        onSuccess(doc);
    }, (e) => {
        onError(e);
    });
};

var deleteTask = (id, ownerId, onSuccess, onNotFound, onError) => {

    if (!ObjectID.isValid(id)) {
        return onError({ message: `ID [${id}] is invalid!` });
    }

    Task.findOneAndDelete({ _id: id, ownerId }).then((task) => {
        if (task) {
            onSuccess(task);
        } else {
            onNotFound();
        }
    }, (e) => {
        onError(e);
    });

};

var updateTask = (id, ownerId, body, onSuccess, onNotFound, onError) => {

    if (!ObjectID.isValid(id)) {
        return onError({ message: `ID [${id}] is invalid!` });
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Task.findOneAndUpdate({ _id: id, ownerId }, { $set: body }, { new: true }).then((task) => {
        if (task) {
            onSuccess(task);
        } else {
            onNotFound();
        }
    }, (e) => {
        onError(e);
    });

};

module.exports = {
    listTasks,
    findTask,
    createTask,
    deleteTask,
    updateTask
};
