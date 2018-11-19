const { ObjectID } = require('mongodb');
const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Task } = require('../models/task');

const testTasks = [
    { _id: new ObjectID(), text: 'First task' },
    { _id: new ObjectID(), text: 'Second task' },
    { _id: new ObjectID(), text: 'Third task' }
];

beforeEach((done) => {
    Task.deleteMany({})
        .then(() => {
            return Task.insertMany(testTasks);
        })
        .then(() => done());
});

describe('GET /tasks', () => {

    it('Should return a list of tasks', (done) => {
        request(app)
            .get('/tasks')
            .expect(200)
            .expect((res) => {
                expect(res.body.tasks.length).toBe(3);
            })
            .end(done);
    });

    it('Should find a task by ID', (done) => {
        request(app)
            .get(`/tasks/${testTasks[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.task.text).toBe(testTasks[0].text);
            })
            .end(done);
    });

    it('Should return 404', (done) => {
        request(app)
            .get('/tasks/9bef8b6998d50e2d56d73625')
            .expect(404)
            .end(done);
    });

    it('Should return 400', (done) => {
        request(app)
            .get('/tasks/123')
            .expect(400)
            .end(done);
    });

});

describe('POST /tasks', () => {

    it('Should create a new task', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/tasks')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.task.text).toBe(text);
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Task.find({ text }).then((tasks) => {
                    expect(tasks.length).toBe(1);
                    expect(tasks[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            });

    });

    it('Should not create task with invalid request data', (done) => {
        request(app)
            .post('/tasks')
            .send({})
            .expect(400)
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Task.find().then((tasks) => {
                    expect(tasks.length).toBe(3);
                    done();
                }).catch((e) => done(e));

            });
    });

});

describe('DELETE /tasks', () => {

    it('Should delete a task by ID', (done) => {
        request(app)
            .delete(`/tasks/${testTasks[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.task.text).toBe(testTasks[0].text);
            })
            .end(done);
    });

    it('Should return 404', (done) => {
        request(app)
            .delete('/tasks/9bef8b6998d50e2d56d73625')
            .expect(404)
            .end(done);
    });

    it('Should return 400', (done) => {
        request(app)
            .delete('/tasks/123')
            .expect(400)
            .end(done);
    });

});