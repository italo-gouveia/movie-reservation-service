import { Router } from 'express';
import movieController from '../controllers/movieController';
import { authenticate, authorize } from '../utils/authMiddleware';

// Initialize router
const router = Router();

/**
 * @middleware authenticate
 * @middleware authorize(['admin'])
 * @desc Apply authentication and authorization middleware for admin routes
 */
router.use(authenticate);
router.use(authorize(['admin']));

/**
 * @route POST /
 * @desc Add a new movie
 * @access Private
 * @middleware authenticate
 * @middleware authorize(['admin'])
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} - The created movie object
 */
router.post('/', movieController.addMovie);

/**
 * @route PUT /:id
 * @desc Update a movie by ID
 * @access Private
 * @middleware authenticate
 * @middleware authorize(['admin'])
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @param {string} req.params.id - The ID of the movie to update
 * @returns {Object} - The updated movie object
 */
router.put('/:id', movieController.updateMovie);

/**
 * @route DELETE /:id
 * @desc Delete a movie by ID
 * @access Private
 * @middleware authenticate
 * @middleware authorize(['admin'])
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @param {string} req.params.id - The ID of the movie to delete
 * @returns {Object} - Confirmation message of deletion
 */
router.delete('/:id', movieController.deleteMovie);

/**
 * @route GET /:id
 * @desc Get a movie by ID
 * @access Public
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @param {string} req.params.id - The ID of the movie to retrieve
 * @returns {Object} - The movie object
 */
router.get('/:id', movieController.getMovieById);

/**
 * @route GET /
 * @desc Get a list of movies, optionally filtered by genre
 * @access Public
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @param {string} [req.query.genre] - Optional genre filter
 * @returns {Array} - List of movies
 */
router.get('/', movieController.getMovies);

export default router;
