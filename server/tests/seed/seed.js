const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { User } = require('../../models/user');
const { Task } = require('../../models/task');

const userId1 = new ObjectID();
const userId2 = new ObjectID();

const users = [{
    _id: userId1,
    email: 'user1@foo.com',
    password: 'password1',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userId1, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: userId2,
    email: 'user2@foo.com',
    password: 'password2',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userId2, access: 'auth' }, 'abc123').toString()
    }]
}
];

const tasks = [
    { _id: new ObjectID(), text: 'First task', ownerId: userId1 },
    { _id: new ObjectID(), text: 'Second task', ownerId: userId2 },
    { _id: new ObjectID(), text: 'Third task', completed: true, completedAt: 333, ownerId: userId2 }
];

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();
        return Promise.all([user1, user2]);
    }).then(() => done());
};

const populateTasks = (done) => {
    Task.deleteMany({}).then(() => {
        return Task.insertMany(tasks);
    }).then(() => done());
};

module.exports = {
    users,
    tasks,
    populateUsers,
    populateTasks
};