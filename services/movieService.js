import { Movie } from '../models';
import { info, warn, error as _error } from '../logger'; // Import the logger

const createMovie = async (title, description, poster_url, genre) => {
    try {
        info('Creating a new movie', { title, description, poster_url, genre });

        if (!title || !description || !poster_url || !genre) {
            warn('Validation failed for movie creation', {
                title,
                description,
                poster_url,
                genre,
            });
            throw new Error('Missing required fields'); // Ensure this is handled by the middleware
        }

        const movie = await Movie.create({
            title,
            description,
            poster_url,
            genre,
        });
        info('Movie created successfully', { movie });

        return movie;
    } catch (error) {
        _error('Error creating movie', {
            message: error.message,
            stack: error.stack,
        });
        throw error; // Re-throw the error to be caught by middleware
    }
};

const updateMovieById = async (id, updates) => {
    try {
        const [updated] = await Movie.update(updates, { where: { id } });

        if (updated) {
            const updatedMovie = await Movie.findByPk(id);
            info('Movie updated successfully', { updatedMovie });
            return updatedMovie;
        } else {
            warn('Movie not found for update', { id });
            return null;
        }
    } catch (error) {
        _error('Error updating movie', {
            message: error.message,
            stack: error.stack,
        });
        throw error; // Re-throw the error to be caught by middleware
    }
};

const deleteMovieById = async (id) => {
    try {
        const deleted = await Movie.destroy({ where: { id } });

        if (deleted) {
            info('Movie deleted successfully', { id });
            return true;
        } else {
            warn('Movie not found for deletion', { id });
            return false;
        }
    } catch (error) {
        _error('Error deleting movie', {
            message: error.message,
            stack: error.stack,
        });
        throw error; // Re-throw the error to be caught by middleware
    }
};

const getMovieById = async (id) => {
    try {
        const movie = await Movie.findByPk(id);

        if (movie) {
            info('Movie retrieved successfully', { movie });
        } else {
            warn('Movie not found', { id });
        }

        return movie;
    } catch (error) {
        _error('Error retrieving movie', {
            message: error.message,
            stack: error.stack,
        });
        throw error; // Re-throw the error to be caught by middleware
    }
};

const getMovies = async (genre) => {
    try {
        const whereClause = genre ? { genre } : {};
        const movies = await Movie.findAll({ where: whereClause });
        info('Movies retrieved successfully', { count: movies.length });

        return movies;
    } catch (error) {
        _error('Error retrieving movies', {
            message: error.message,
            stack: error.stack,
        });
        throw error; // Re-throw the error to be caught by middleware
    }
};

export default {
    createMovie,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getMovies,
};
