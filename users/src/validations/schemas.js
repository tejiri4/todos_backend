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

export { userSchema, idSchema, updateUserSchema };