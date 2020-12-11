import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
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

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;