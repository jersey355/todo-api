const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { Task } = require('../models/task');

var list = (onSuccess, onError) => {
    Task.find().then((tasks) => {
        onSuccess(tasks);
    }, (e) => {
        onError(e);
    });
};

var findById = (id, onSuccess, onNotFound, onError) => {

    if (!ObjectID.isValid(id)) {
        return onError({ message: `ID [${id}] is invalid!` });
    }

    Task.findOne({ _id: id }).then((task) => {
        if (task) {
            onSuccess(task);
        } else {
            onNotFound();
        }
    }, (e) => {
        onError(e);
    });

};

var create = (taskData, onSuccess, onError) => {
    var task = new Task(taskData);
    task.save().then((doc) => {
        onSuccess(doc);
    }, (e) => {
        onError(e);
    });
};

var deleteById = (id, onSuccess, onNotFound, onError) => {

    if (!ObjectID.isValid(id)) {
        return onError({ message: `ID [${id}] is invalid!` });
    }

    Task.findOneAndDelete({ _id: id }).then((task) => {
        if (task) {
            onSuccess(task);
        } else {
            onNotFound();
        }
    }, (e) => {
        onError(e);
    });

};

var updateById = (id, body, onSuccess, onNotFound, onError) => {

    if (!ObjectID.isValid(id)) {
        return onError({ message: `ID [${id}] is invalid!` });
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Task.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }).then((task) => {
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
    list,
    findById,
    create,
    deleteById,
    updateById
};
