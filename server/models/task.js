const { ObjectID } = require('mongodb');

var { mongoose } = require('../db/mongoose');

var Task = mongoose.model('Task', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

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

    Task.findById(id).then((task) => {

        if (task) {
            onSuccess(task);
        } else {
            onNotFound();
        }

    }, (e) => {
        onError(e);
    });

};

var create = (text, completed, completedAt, onSuccess, onError) => {

    var task = new Task({ text, completed, completedAt });
    task.save().then((doc) => {
        onSuccess(doc);
    }, (e) => {
        onError(e);
    });

};

module.exports = {
    Task,
    list,
    findById,
    create
};
