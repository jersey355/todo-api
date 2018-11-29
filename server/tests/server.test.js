const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { users, tasks, populateUsers, populateTasks } = require('./seed/seed');
const { Task } = require('../models/task');

before(populateUsers);
beforeEach(populateTasks);

describe('GET /users/me', () => {

    it('Should return the user \"me\"', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('Should return 401', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });

});

describe('POST /users', () => {

    it('Should create a new user', (done) => {

        var email = 'john.doe@foo.com';
        var password = 'password123!';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body.user._id).toExist();
                expect(res.body.user.email).toBe(email);
            })
            .end(done);

    });

    it('Should return validation errors on invalid email', (done) => {

        var email = 'john.doe'; // invalid email address

        request(app)
            .post('/users')
            .send({ email, password: 'password123!' })
            .expect(400)
            .expect((res) => {
                expect(res.body.name).toBe("ValidationError");
                expect(res.body.message).toBe(`User validation failed: email: ${email} is not a valid email!`);
            })
            .end(done);

    });

    it('Should not create a new user if email already exists', (done) => {
        request(app)
            .post('/users')
            .send({ email: 'john.doe@foo.com', password: 'password123!' })
            .expect(400)
            .expect((res) => {
                expect(res.body.name).toBe("MongoError");
                expect(res.body.code).toBe(11000); // duplicate error code
            })
            .end(done);
    });

});

describe('POST /users/logn', () => {

    it('Should receive a token after on successful login', (done) => {
        var email = users[1].email;
        var password = users[1].password;
        request(app)
            .post('/users/login')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body.user._id).toExist();
                expect(res.body.user.email).toBe(email);
            })
            .end(done);
    });

    it('Should receive an error on login failure', (done) => {
        var email = users[1].email;
        request(app)
            .post('/users/login')
            .send({ email, password: `${users[1].password}NOT!` })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
                expect(res.body.message).toBe('Password mismatch');
            })
            .end(done);
    });

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
            .get(`/tasks/${tasks[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.task.text).toBe(tasks[0].text);
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
        var id = tasks[0]._id.toHexString();
        request(app)
            .delete(`/tasks/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.task._id).toBe(id);
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

describe('PATCH /tasks', () => {

    it('Should set task to completed', (done) => {
        var id = tasks[0]._id.toHexString();
        var text = 'Make some widgets';
        request(app)
            .patch(`/tasks/${id}`)
            .send({ completed: true, text })
            .expect(200)
            .expect((res) => {
                expect(res.body.task.text).toBe(text);
                expect(res.body.task.completed).toBe(true);
                expect(res.body.task.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('Should clear task completed flag', (done) => {
        var id = tasks[2]._id.toHexString();
        var text = 'Make some widgets';
        request(app)
            .patch(`/tasks/${id}`)
            .send({ completed: false })
            .expect(200)
            .expect((res) => {
                expect(res.body.task.completed).toBe(false);
                expect(res.body.task.completedAt).toBeNull;
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