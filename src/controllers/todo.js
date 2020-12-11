import User from "models/user";
import Todo from "models/todo";
import messages from "utils/messages"

const createTodo = async (req, res) => {
	try {
		// check if user exists
		const user = await User.findById(req.filtered.user_id);
		
		// check if user exist
		if(!user) return res.status(400).json({ error: messages.userNotFound });

		// create todo
		const newTodo = await Todo.create({ ...req.filtered, state: 'todo' });

		return res.status(200).json(newTodo)

	} catch (err) {
		return res.status(500).json({ error: messages.serverError });
	}
}

const getUserTodos = async (req, res) => {
	try {
		const todos = await Todo.find({ user_id: req.filtered.id }).exec();
		
		return res.status(200).json(todos || [])
	} catch(err) {
		return res.status(500).json({ error: messages.serverError });
	}
}

const updateTodo = async (req,res) => {
	try {
		const todo = await Todo.findById(req.filtered.id);

		if(!todo) return res.status(400).json({ error: messages.todoNotFound  });

		await todo.updateOne(req.body);

		return res.status(200).json({ message: messages.todoUpdated })
  } catch(err) {
		return res.status(500).json({ error: messages.serverError });
  }
}

const deleteTodo = async (req, res) => {
	try {
		const todo = await Todo.findById(req.filtered.id);

		if(!todo) return res.status(400).json({ error: messages.todoNotFound  });

		await todo.deleteOne();

		return res.status(200).json({ message: messages.todoDeleted })
  } catch(err) {
		return res.status(500).json({ error: messages.serverError });
  }
}

const getTodo = async (req, res) => {
	try {
		const todo = await Todo.findById(req.filtered.id);
		
		if(!todo) return res.status(400).json({ error: messages.todoNotFound  });

		return res.status(200).json(todo)
  } catch(err) {
		return res.status(500).json({ error: messages.serverError });
  }
}

export { createTodo, getUserTodos, updateTodo, deleteTodo, getTodo };