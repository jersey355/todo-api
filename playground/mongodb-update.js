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

    // FIND AND UPDATE ONE

    // db.collection('Tasks').findOneAndUpdate(
    //     { _id: new ObjectID('5bee250dfc156f17f9677e71') },
    //     { $set: { completed: true } },
    //     { returnOriginal: false })
    //     .then((result) => {
    //         console.log(result);
    //     });

    // CHALLENGE:
    // db.collection('Users').findOneAndUpdate(
    //     { _id: 123 },
    //     {
    //         $set: { name: 'Ed' },
    //         $inc: { age: 1 }
    //     },
    //     { returnOriginal: false })
    //     .then((result) => {
    //         console.log(result);
    //     });

    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectID("5beed4ea646a081de29e73f5") },
        {
            $set: { name: 'Sam' },
            $inc: { age: -1 }
        },
        { returnOriginal: false })
        .then((result) => {
            console.log(result);
        });

    //client.close();

});