import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: `There was an error: ${error}` });
  }
};

export const login = async (req, res) => {
  res.send("log in user");
};

export const updateUser = async (req, res) => {
  res.send("update user");
};
