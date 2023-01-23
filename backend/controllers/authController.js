import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // need to select password due to "select: false" in User password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  // Remove password from response
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export const updateUser = async (req, res) => {
  console.log(req.user);
  res.send("update user");
};
