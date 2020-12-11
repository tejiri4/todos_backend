import express from 'express';
import userRouter from "routes/v1/user";
import todoRouter from "routes/v1/todo";

const v1Router = express.Router();

v1Router.use('/users', userRouter)
v1Router.use('/todos', todoRouter)

export default v1Router;
