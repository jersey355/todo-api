const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Task } = require('../server/models/task');

var id = '5bef8b6998d50e2d56d73625';

if (!ObjectID.isValid(id)) {
    console.log(`ID [${id}] is not valid!!!!!!!!!!!!`);
}

// Task.find({ _id: id })
//     .then((tasks) => {
//         console.log('Tasks', tasks);
//         console.log('\n');
//     });

// Task.findOne({ _id: id })
//     .then((task) => {
//         console.log('Task', task);
//         console.log('\n');
//     });

Task.findById(id)
    .then((task) => {

        if (!task) {
            return console.log(`ID [${id}] not found!`)
        }

        console.log(`\nTask by ID: ${JSON.stringify(task)}`);

    }).catch((e) => console.log(e.message));