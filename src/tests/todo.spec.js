import app from 'src';
import crypto from "crypto";
import request from 'supertest';
import User from "models/user";
import Todo from "models/todo";
import testData from "tests/fixtures/testData"
import messages from "utils/messages"

describe('todo', () => {
  const todos = testData.todos;
  let newTodoId;

  it('should return all user todos',(done) => {
    const mock = jest.spyOn(Todo, 'find');

    mock.mockImplementation(({ user_id }) => ({
        exec: () => todos.filter(todo => todo.user_id === user_id )
    }));

    request(app)
			.get(`/v1/todos/users/${testData.users[1]._id}`)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
			if (err) throw err;

			expect(res.body.length).toEqual(2)

			done()
    });
  });

  it('should return a single todo',(done) => {
    const mock = jest.spyOn(Todo, 'findById');

    mock.mockImplementation((id) => todos.find(user => user._id === id));

      request(app)
      .get(`/v1/todos/${todos[0]._id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { _id, name } = res.body;

        expect(_id).toEqual(todos[0]._id)
        expect(name).toEqual(todos[0].name)
        done()
      });
  });

  it('should not return a single todo with wrong id',(done) => {
    const mock = jest.spyOn(Todo, 'findById');

    mock.mockImplementation((id) => todos.find(user => user._id === id));

      request(app)
      .get(`/v1/todos/5fd299a5342b1c417a253ce9`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body.error).toEqual(messages.todoNotFound)
        done()
      });
  });

  it('should create a new todo',(done) => {
    const newTodo = { user_id: "5fd30ccd9514265ca6a9ac8f", description: "Go to the school today."}

    const mockTodo = jest.spyOn(Todo, 'create');
		const mockUser = jest.spyOn(User, 'findById');

    mockUser.mockImplementation((id) => {
      return testData.users.find(user => user._id === id)
		});
		
    mockTodo.mockImplementation(todo => {
      const todoCreated = { ...todo, _id: crypto.randomBytes(12).toString('hex') };

      todos.push(todoCreated)

      return todoCreated;
    });

    request(app)
      .post(`/v1/todos`)
      .expect('Content-Type', /json/)
      .send(newTodo)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { description, _id } = res.body;

        newTodoId = _id;

        expect(description).toEqual("Go to the school today.")
        done()
      });
  });

  it('should not update a new user with wrong id',(done) => {
		const newTodo = { state: "done" }

    const mock = jest.spyOn(Todo, 'findById');

    mock.mockImplementation((id) => {
      return todos.find(todo => todo._id === id)
    });

    request(app)
      .put(`/v1/todos/5fd20ccd9514265ca6a9ac8f`)
      .expect('Content-Type', /json/)
      .send(newTodo)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body.error).toEqual(messages.todoNotFound)
        done()
      });
  });

  it('should update a new todo',(done) => {
		const newTodo = { state: "done" }

    const mock = jest.spyOn(Todo, 'findById');

    mock.mockImplementation((id) => {
      return {
        ...todos.find(todo => todo._id === id),
        updateOne: jest.fn()
      }
    });

    request(app)
      .put(`/v1/todos/${newTodoId}`)
      .expect('Content-Type', /json/)
      .send(newTodo)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { message } = res.body;

        expect(message).toEqual(messages.todoUpdated)
        done()
      });
  });

  it('should not delete a todo with wrong id',(done) => {
    const mock = jest.spyOn(Todo, 'findById');

    mock.mockImplementation((id) => {
      return todos.find(todo => todo._id === id)
    });

    request(app)
      .delete(`/v1/todos/5fd20ccd9514265ca6a9ac8f`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body.error).toEqual(messages.todoNotFound)
        done()
      });
  });

  it('should delete a todo',(done) => {
    const mock = jest.spyOn(Todo, 'findById');

    mock.mockImplementation((id) => {
      return {
        ...todos.find(todo => todo._id === id),
        deleteOne: jest.fn()
      }
    });

    request(app)
      .delete(`/v1/todos/${newTodoId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { message } = res.body;

        expect(message).toEqual(messages.todoDeleted)
        done()
      });
  });
});