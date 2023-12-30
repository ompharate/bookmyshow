const Movie = require("../models/Movie");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const addMovie = async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;
  // verify token
  jwt.verify(token, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title ||
    title.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !posterUrl ||
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let response;
  try {
    response = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      admin: adminId,
      posterUrl,
      featured,
    });
  } catch (error) {
    return res.status(422).json({ message: "Somthing went wrong!!" });
  }

  
  // transaction concept should use here instead of this. for moving saving and below operation
  const session = await mongoose.startSession();
  const adminUser = await Admin.findById(adminId);
  session.startTransaction();
  await response.save({ session });
  adminUser.addedMovies.push(response);
  await adminUser.save({ session });
  await session.commitTransaction();

  if (!response) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ response });

};

const getMovies = async (req, res, next) => {
  let data;
  try {
    data = await Movie.find();
  } catch (error) {
    res.send({ error });
  }

  if (!data) {
    res.send({ message: "Movie not found" });
  }

  res.send({ data });
};

const getMovieById = async (req, res, next) => {
  let data;
  let id = req.params.id;
  try {
    data = await Movie.findById(id);
  } catch (error) {
    res.send({ error });
  }

  if (!data) {
    res.send({ message: "Movie not found" });
  }

  res.send({ data });
};

module.exports = { addMovie, getMovies, getMovieById };
