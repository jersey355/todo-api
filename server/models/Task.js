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

function create(text, completed, completedAt, onSuccess, onError) {

    var task = new Task({ text, completed, completedAt });
    task.save().then((doc) => {
        onSuccess(doc);
    }, (e) => {
        onError(e);
    });

};

module.exports = {
    //Task,
    create
};