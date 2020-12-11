import User from "models/user";
import Task from "models/task";
import messages from "utils/messages"

const createTask = async (req, res) => {
	try {
		// check if user exists
		const user = await User.findById(req.filtered.user_id);
		
		// check if user exist
		if(!user) return res.status(400).json({ message: messages.userNotFound });

		// create task
		const newTask = await Task.create({ ...req.filtered, state: 'task' });

		return res.status(200).json(newTask)

	} catch (err) {
		return res.status(500).json({ error: messages.serverError });
	}
}

const getUserTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user_id: req.filtered.id }).exec();
		
		return res.status(200).json(tasks || [])
	} catch(err) {
		return res.status(500).json({ message: messages.serverError });
	}
}

const updateTask = async (req,res) => {
	try {
		const task = await Task.findById(req.filtered.id);

		if(!task) return res.status(400).json({ message: messages.taskNotFound  });

		await task.updateOne(req.body);

		return res.status(200).json({ message: messages.taskUpdated })
  } catch(err) {
		return res.status(500).json({ message: messages.serverError });
  }
}

const deleteTask = async (req, res) => {
	try {
		const task = await Task.findById(req.filtered.id);

		if(!task) return res.status(400).json({ message: messages.taskNotFound  });

		await task.deleteOne();

		return res.status(200).json({ message: messages.taskDeleted })
  } catch(err) {
		return res.status(500).json({ message: messages.serverError });
  }
}

const getTask = async (req, res) => {
	try {
		const task = await Task.findById(req.filtered.id);
		
		if(!task) return res.status(400).json({ message: messages.taskNotFound  });

		return res.status(200).json(task)
  } catch(err) {
		return res.status(500).json({ message: messages.serverError });
  }
}

export { createTask, getUserTasks, updateTask, deleteTask, getTask };