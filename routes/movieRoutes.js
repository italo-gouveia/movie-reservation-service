const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticate, authorize } = require('../utils/authMiddleware');

// Apply middleware for admin routes
router.use(authenticate);
router.use(authorize(['admin']));

// Route to add a movie
router.post('/', movieController.addMovie);

// Route to update a movie by ID
router.put('/:id', movieController.updateMovie);

// Route to delete a movie by ID
router.delete('/:id', movieController.deleteMovie);

// Route to get a movie by ID
router.get('/:id', movieController.getMovieById);

// Route to get a list of movies, optionally filtered by genre
router.get('/', movieController.getMovies);

module.exports = router;
