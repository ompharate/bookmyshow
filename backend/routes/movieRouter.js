const express = require('express');
const { addMovie,getMovies, getMovieById } = require('../controllers/movieController');
const movieRouter = express.Router();

// to add movies
movieRouter.post('/add',addMovie);

// to fetch all movies
movieRouter.get('/',getMovies);

// fetch movie by id
movieRouter.get('/:id',getMovieById);


module.exports = movieRouter;