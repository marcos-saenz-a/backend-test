import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered." });
    }

    const user = await User.create({ name, email });
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};