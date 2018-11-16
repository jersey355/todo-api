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

    // DELETE MANY

    // db.collection('Tasks').deleteMany({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });

    // DELETE ONE

    // db.collection('Tasks').deleteOne({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });

    // FIND 1 AND DELETE

    // db.collection('Tasks').findOneAndDelete({ completed: false }).then((result) => {
    //     console.log(result);
    // });

    // CHALLENGE:

    db.collection('Users').deleteMany({ name: 'Ed' }).then((result) => {
        console.log('#############################################################')
        console.log(result);
    });

    db.collection('Users').deleteOne({ _id: new ObjectID('5beded79172d0814efa58284') }).then((result) => {
        console.log('#############################################################')
        console.log(result);
    });

    //client.close();

});