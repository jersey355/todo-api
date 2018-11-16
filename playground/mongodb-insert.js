//const MongoClient = require('mongodb').MongoClient;

// using destructuring
const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(`obj = ${obj}`);

MongoClient.connect('mongodb://localhost:27017/todo', (err, client) => {

    if (err) {
        return console.log('Unable to connect to todo DB');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('todo');

    // db.collection('Tasks').insertOne({
    //     text: 'Do something else',
    //     completed: false
    // }, (err, result) => {

    //     if (err) {
    //         return console.log('Unable to insert task', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        //_id: 123,
        name: 'Jen',
        age: 25,
        location: 'San Francisco, CA'
    }, (err, result) => {

        if (err) {
            return console.log('Unable to insert new user', err);
        }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));

    });

    client.close();

});