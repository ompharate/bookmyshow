const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(error);
  }

  if (!users) {
    return res.status(404).send({ message: "User not found" });
  }

  return res.status(200).send({ users });
};

const createUser = async (req, res, next) => {
  let response;
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      return res.status(422).send({ message: "Please input valid data!" });
    }

    const hashedPassword = bcrypt.hashSync(password);
    response = new User({ name, email, password: hashedPassword });
    response = await response.save();
    console.log("hellow");
    console.log(response);
  } catch (error) {
    return res
      .status(422)
      .send({ message: "input field are missing! or something went wrong!" });
  }

  if (!response) {
    return res.status(404).send({ message: "User not created" });
  }

  return res.status(201).send({ response });
};

const updateUser = async (req, res, next) => {
  let id = req.params.id;
  let response;
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      return res.status(422).send({ message: "Please input valid data!" });
    }

    const hashedPassword = bcrypt.hashSync(password);
    response = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return res
      .status(422)
      .send({ message: "input field are missing! or something went wrong!" });
  }

  if (!response) {
    return res.status(404).send({ message: "User not created" });
  }

  return res
    .status(201)
    .send({ response, message: "User updated successfuly" });
};

const deleteUser = async (req, res, next) => {
  let id = req.params.id;
  let response;
  try {
    response = await User.findByIdAndDelete(id);
  } catch (error) {
    return res.status(422).send({ message: " something went wrong!" });
  }

  if (!response) {
    return res.status(404).send({ message: "User not deleted" });
  }

  return res.status(201).send({ response, message: "Deleted successfuly" });
};

const loginUser = async (req, res, next) => {
  let response;
  const { email, password } = req.body;
  try {
    if (!email || email.trim() === "" || !password || password.trim() === "") {
      return res.status(422).send({ message: "Please input valid data!" });
    }

    response = await User.findOne({ email: email });
  } catch (error) {
    return res.status(422).send({ message: " something went wrong!" });
  }

  if (!response) {
    return res.status(404).send({ message: "User not found" });
  }

  isPasswordsValid = bcrypt.compareSync(password, response.password);

  if (!isPasswordsValid) {
    return res.status(404).send({ message: "password is incorrect" });
  }
  return res.status(201).send({ response, message: "login successfuly" });
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, loginUser };
