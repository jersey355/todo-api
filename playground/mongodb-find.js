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

    // find returns a cursor, so we convert to array
    // db.collection('Tasks').find({ _id: new ObjectID('5bee250dfc156f17f9677e71') }).toArray().then((docs) => {
    //     console.log('Tasks: ');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('ERROR: Unable to fetch tasks', err);
    // });

    // db.collection('Tasks').find().count().then((count) => {
    //     console.log(`Task count: ${count}`);
    // }, (err) => {
    //     console.log('ERROR: Unable to fetch task count', err);
    // });

    db.collection('Users').find({ name: 'Ed' }).count().then((count) => {
        console.log(`Users count for name Ed: ${count}`);
    }, (err) => {
        console.log('ERROR: Unable to fetch task count', err);
    });

    //client.close();

});