const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Task } = require('../server/models/task');

var id = '5bef8b6998d50e2d56d73625';

// Task.remove({}).then((result) => {
//     console.log('Removed', result);
// });

Task.findOneAndRemove({ _id: '5bf1fd4bfc156f17f967d7b8' }).then((task) => {
    console.log('Removed', task);
});


Task.findByIdAndRemove('5bf1fd4bfc156f17f967d7b8').then((task) => {
    console.log('Removed', task);
});