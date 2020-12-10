import express from 'express';
import validate from 'validations';
import userSchema from 'validations/schemas/user';

const userRouter = express.Router();

userRouter.post('/', validate(userSchema), (req,res) => {
    res.status(200).json({ message: 'All good' })
})

export default userRouter;