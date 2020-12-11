import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	description: {
		type: String,
		required: true
  },
  state: {
		type: String,
		required: true
  },
  user_id: {
		type: String,
		required: true
	}
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema);

export default Task;