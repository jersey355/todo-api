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

function create(text, completed, completedAt, onSuccess, onError) {

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
    create
};
