const _ = require('lodash');
const { mongoose } = require('../db/mongoose');

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
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = { Task };
