import { body, param, query, validationResult } from 'express-validator';
import xss from 'xss';
import movieService from '../services/movieService.js';
import { error as _error } from '../utils/logger.js'; // Import the logger

/**
 * Sanitize input using xss library.
 *
 * @param {string} input - The input string to be sanitized.
 * @returns {string} - The sanitized input string.
 */
const sanitizeInput = (input) => xss(input);

/**
 * Controller for adding a new movie.
 *
 * @type {Array<Function>}
 */
const addMovie = [
	// Validation and sanitization middleware
	body('title').isString().withMessage('Title must be a string'),
	body('description').isString().withMessage('Description must be a string'),
	body('poster_url')
		.optional()
		.isURL()
		.withMessage('Poster URL must be a valid URL'),
	body('genre').optional().isString().withMessage('Genre must be a string'),
	async (req, res, next) => {
		// Sanitize inputs
		req.body.title = sanitizeInput(req.body.title);
		req.body.description = sanitizeInput(req.body.description);
		req.body.poster_url = sanitizeInput(req.body.poster_url);
		req.body.genre = sanitizeInput(req.body.genre);

		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { title, description, poster_url, genre } = req.body;
			const movie = await movieService.createMovie(
				title,
				description,
				poster_url,
				genre
			);
			res.status(201).json(movie);
		} catch (error) {
			_error('Error in addMovie controller', {
				message: error.message,
				stack: error.stack,
				context: { body: req.body, ip: req.ip },
			});
			next(error);
		}
	},
];

/**
 * Controller for updating an existing movie by ID.
 *
 * @type {Array<Function>}
 */
const updateMovie = [
	// Validation and sanitization middleware
	param('id').isNumeric().withMessage('Movie ID must be a number'),
	body('title').optional().isString().withMessage('Title must be a string'),
	body('description')
		.optional()
		.isString()
		.withMessage('Description must be a string'),
	body('poster_url')
		.optional()
		.isURL()
		.withMessage('Poster URL must be a valid URL'),
	body('genre').optional().isString().withMessage('Genre must be a string'),
	async (req, res, next) => {
		// Sanitize inputs
		req.body.title = sanitizeInput(req.body.title);
		req.body.description = sanitizeInput(req.body.description);
		req.body.poster_url = sanitizeInput(req.body.poster_url);
		req.body.genre = sanitizeInput(req.body.genre);

		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { id } = req.params;
			const { title, description, poster_url, genre } = req.body;
			const updatedMovie = await movieService.updateMovieById(id, {
				title,
				description,
				poster_url,
				genre,
			});

			if (updatedMovie) {
				res.status(200).json(updatedMovie);
			} else {
				res.status(404).json({ message: 'Movie not found' });
			}
		} catch (error) {
			_error('Error in updateMovie controller', {
				message: error.message,
				stack: error.stack,
				context: { body: req.body, params: req.params, ip: req.ip },
			});
			next(error);
		}
	},
];

/**
 * Controller for deleting a movie by ID.
 *
 * @type {Array<Function>}
 */
const deleteMovie = [
	// Validation middleware
	param('id').isNumeric().withMessage('Movie ID must be a number'),
	async (req, res, next) => {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { id } = req.params;
			const success = await movieService.deleteMovieById(id);

			if (success) {
				res.status(204).json({ message: 'Movie deleted' });
			} else {
				res.status(404).json({ message: 'Movie not found' });
			}
		} catch (error) {
			_error('Error in deleteMovie controller', {
				message: error.message,
				stack: error.stack,
				context: { params: req.params, ip: req.ip },
			});
			next(error);
		}
	},
];

/**
 * Controller for getting a movie by ID.
 *
 * @type {Array<Function>}
 */
const getMovieById = [
	// Validation middleware
	param('id').isNumeric().withMessage('Movie ID must be a number'),
	async (req, res, next) => {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { id } = req.params;
			const movie = await movieService.getMovieById(id);

			if (movie) {
				res.status(200).json(movie);
			} else {
				res.status(404).json({ message: 'Movie not found' });
			}
		} catch (error) {
			_error('Error in getMovieById controller', {
				message: error.message,
				stack: error.stack,
				context: { params: req.params, ip: req.ip },
			});
			next(error);
		}
	},
];

/**
 * Controller for getting a list of movies, optionally filtered by genre.
 *
 * @type {Array<Function>}
 */
const getMovies = [
	// Validation and sanitization middleware
	query('genre').optional().isString().withMessage('Genre must be a string'),
	async (req, res, next) => {
		// Sanitize inputs
		req.query.genre = sanitizeInput(req.query.genre);

		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { genre } = req.query;
			const movies = await movieService.getMovies(genre);
			res.status(200).json(movies);
		} catch (error) {
			_error('Error in getMovies controller', {
				message: error.message,
				stack: error.stack,
				context: { query: req.query, ip: req.ip },
			});
			next(error);
		}
	},
];

export default {
	addMovie,
	updateMovie,
	deleteMovie,
	getMovieById,
	getMovies,
};
