import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().required(),
})

const idSchema = Joi.object({
   id: Joi.string().length(24).hex()
});

const updateUserSchema = Joi.object({
    id: Joi.string().length(24).hex(),
    name: Joi.string().required(),
}); 

const todoSchema = Joi.object({
    user_id: Joi.string().length(24).hex().required(),
    description: Joi.string().required()
});

const updateTodoSchema = Joi.object({
	id: Joi.string().length(24).hex(),
}).keys(
	{
		description: Joi.string(),
		state: Joi.string().valid('done')
	}
).or('description', 'state') // At least one of these keys must be in the object to be valid.
.required()

export { userSchema, idSchema, updateUserSchema, todoSchema, updateTodoSchema };