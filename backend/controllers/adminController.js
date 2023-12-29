const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  let isExisting;
  try {
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(422).send({ message: "invalid inputs" });
    }
    isExisting = await Admin.findOne({ email: email });
  } catch (error) {
    res.send({ error });
  }

  if (isExisting) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  let admin;
  let hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (error) {
    res.send({ error });
  }

  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }
  return res.status(201).json({ admin });
};

const loginAdmin = async (req, res) => {
  let response;
  const { email, password } = req.body;
  try {
    if (!email || email.trim() === "" || !password || password.trim() === "") {
      return res.status(422).send({ message: "Please input valid data!" });
    }

    response = await Admin.findOne({ email: email });
  } catch (error) {
    return res.status(422).send({ message: " something went wrong!" });
  }

  if (!response) {
    return res.status(404).send({ message: "Admin not found" });
  }

  isPasswordsValid = bcrypt.compareSync(password, response.password);

  if (!isPasswordsValid) {
    return res.status(404).send({ message: "password is incorrect" });
  }
  return res.status(201).send({ response, message: "Admin login successfuly" });
};

const getAdmin = async (req, res) => {
  let data;
  try {
    data = await Admin.find();
  } catch (error) {
    return res.send({ error });
  }
  if (!data) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  res.send({ data });
};

const getAdminById = async (req, res) => {
  let data;
  let id = req.params.id;
  try {
    data = await Admin.findById(id);
  } catch (error) {
    return res.send({ error });
  }
  if (!data) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  res.send({ data });
};

module.exports = { addAdmin, getAdmin, loginAdmin ,getAdminById};
