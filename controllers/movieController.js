import movieService from '../services/movieService';
import { error as _error } from '../logger'; // Import the logger

const addMovie = async (req, res, next) => {
    try {
        const { title, description, poster_url, genre } = req.body;
        const movie = await movieService.createMovie(title, description, poster_url, genre);
        res.status(201).json(movie);
    } catch (error) {
        _error('Error in addMovie controller', {
            message: error.message,
            stack: error.stack,
            context: { body: req.body, ip: req.ip },
        });
        next(error); // Pass the error to the centralized error handler
    }
};

const updateMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, poster_url, genre } = req.body;
        const updatedMovie = await movieService.updateMovieById(id, { title, description, poster_url, genre });

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
        next(error); // Pass the error to the centralized error handler
    }
};

const deleteMovie = async (req, res, next) => {
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
        next(error); // Pass the error to the centralized error handler
    }
};

const getMovieById = async (req, res, next) => {
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
        next(error); // Pass the error to the centralized error handler
    }
};

const getMovies = async (req, res, next) => {
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
        next(error); // Pass the error to the centralized error handler
    }
};

export default {
    addMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    getMovies,
};
