const Movie = require("../models/Movie");

const addMovie = async (req, res, next) => {
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
      posterUrl,
      featured,
    });
    response = await response.save();
  } catch (error) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      posterUrl,
      title,
    });

    response = await movie.save();

    if (!response) {
      res.send(500).send({ message: "Error saving movie" });
    }

    return res.send(response);
  } catch (error) {
    return res.send({ error });
  }
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




module.exports = { addMovie, getMovies, getMovies };
