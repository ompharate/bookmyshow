const express = require('express');
const { addMovie,getMovies } = require('../controllers/movieController');
const movieRouter = express.Router();

// to add movies
movieRouter.post('/add',addMovie);

// to fetch all movies
movieRouter.get('/',getMovies);


module.exports = movieRouter;