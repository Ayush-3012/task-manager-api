import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) return res.status(404).json({ message: "User Not found" });

    await User.findByIdAndDelete(foundUser._id);
    return res.status(200).json({ message: "User deleted successfully" });

    return res.status(200).json(allTasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
