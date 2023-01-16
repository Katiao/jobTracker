import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError } from "../errors/index.js";

// Note: no need to use try catch block to pass on error to error middleware
// as using "express-async-errors" package
export const register = async (req, res) => {
  // Good to check for some errors (empty values/ duplicate email) in controller before it hits error middleware
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // express async errors package - no need to use next
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  });
};

export const login = async (req, res) => {
  res.send("log in user");
};

export const updateUser = async (req, res) => {
  res.send("update user");
};
