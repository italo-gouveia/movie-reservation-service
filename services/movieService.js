const { Movie } = require('../models');
const logger = require('../logger'); // Import the logger

const createMovie = async (title, description, poster_url, genre) => {
    try {
        logger.info('Creating a new movie', { title, description, poster_url, genre });

        // Validate input
        if (!title || !description || !poster_url || !genre) {
            logger.warn('Validation failed for movie creation', { title, description, poster_url, genre });
            throw new Error('Missing required fields');
        }

        const movie = await Movie.create({ title, description, poster_url, genre });
        logger.info('Movie created successfully', { movie });

        return movie;
    } catch (error) {
        logger.error('Error creating movie', { message: error.message, stack: error.stack });
        throw error;
    }
};

const updateMovieById = async (id, updates) => {
    try {
        const [updated] = await Movie.update(updates, { where: { id } });

        if (updated) {
            const updatedMovie = await Movie.findByPk(id);
            logger.info('Movie updated successfully', { updatedMovie });
            return updatedMovie;
        } else {
            logger.warn('Movie not found for update', { id });
            return null;
        }
    } catch (error) {
        logger.error('Error updating movie', { message: error.message, stack: error.stack });
        throw error;
    }
};

const deleteMovieById = async (id) => {
    try {
        const deleted = await Movie.destroy({ where: { id } });

        if (deleted) {
            logger.info('Movie deleted successfully', { id });
            return true;
        } else {
            logger.warn('Movie not found for deletion', { id });
            return false;
        }
    } catch (error) {
        logger.error('Error deleting movie', { message: error.message, stack: error.stack });
        throw error;
    }
};

const getMovieById = async (id) => {
    try {
        const movie = await Movie.findByPk(id);

        if (movie) {
            logger.info('Movie retrieved successfully', { movie });
        } else {
            logger.warn('Movie not found', { id });
        }

        return movie;
    } catch (error) {
        logger.error('Error retrieving movie', { message: error.message, stack: error.stack });
        throw error;
    }
};

const getMovies = async (genre) => {
    try {
        const whereClause = genre ? { genre } : {};
        const movies = await Movie.findAll({ where: whereClause });
        logger.info('Movies retrieved successfully', { count: movies.length });

        return movies;
    } catch (error) {
        logger.error('Error retrieving movies', { message: error.message, stack: error.stack });
        throw error;
    }
};

module.exports = {
    createMovie,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getMovies
};
