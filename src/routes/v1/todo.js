import express from 'express';
import validate from 'validations';
import { todoSchema, idSchema, updateTodoSchema } from 'validations/schemas';
import { createTodo, getUserTodos, updateTodo, deleteTodo, getTodo } from 'controllers/todo';

const todoRouter = express.Router();

todoRouter.post('/', validate(todoSchema), createTodo)
todoRouter.put('/:id', validate(updateTodoSchema), updateTodo)
todoRouter.get('/:id',validate(idSchema), getTodo)
todoRouter.delete('/:id', validate(idSchema), deleteTodo)
todoRouter.get('/users/:id', validate(idSchema), getUserTodos)

export default todoRouter;