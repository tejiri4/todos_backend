import User from "models/user";

const createUser = async (req, res) => {
  try {
		const { name } = req.filtered;

    const user = new User({
			name
		});

		const newUser = await user.save();

		return res.status(200).json(newUser)
  } catch(err) {
    console.log(err);
  }
} 

const getUsers = async (req, res) => {
	try {
	  const users = await User.find();

		return res.status(200).json(users)
  } catch(err) {
    console.log(err);
  }
}

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.filtered.id);
		
		if(!user) return res.status(400).json({ errors: ['user not found']});

		return res.status(200).json(user)
  } catch(err) {
    console.log(err.message);
  }
}

const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.filtered.id);

		if(!user) return res.status(400).json({ errors: ['user not found']});

		await user.deleteOne();

		return res.status(200).json({ message: 'User was deleted successfully.'})
  } catch(err) {
    console.log(err.message);
  }
}

const updateUser = async (req, res) => {
	try {
		const user = await User.findById(req.filtered.id);

		if(!user) return res.status(400).json({ errors: ['user not found']});

		await user.updateOne({ name: req.filtered.name });

		return res.status(200).json({ message: 'User was updated successfully.'})
  } catch(err) {
    console.log(err.message);
  }
}

export { createUser, getUsers, getUser, deleteUser, updateUser }