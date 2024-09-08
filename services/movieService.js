import redis from 'redis';
import { Movie } from '../models';
import { info, warn, error as _error } from '../logger'; // Import the logger
import { promisify } from 'util';

// Configure Redis client
const redisClient = redis.createClient({
    host: 'redis', // Adjust based on your setup
    port: 6379,
});
  
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

const CACHE_EXPIRY = 3600; // Cache expiry in seconds (1 hour)

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

        // Update the movies cache
        await updateMoviesCache();
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

            // Update the cache for the updated movie
            await setAsync(`movie:${id}`, JSON.stringify(updatedMovie), 'EX', CACHE_EXPIRY);

            // Update the cache for the movies list and genre-specific movies list
            await updateMoviesCache();
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
            // Update the cache for movies list and genre-specific movies list
            await updateMoviesCache();

            // Clear the cache for the deleted movie
            await delAsync(`movie:${id}`);
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
        // Check cache first
        const cachedMovie = await getAsync(`movie:${id}`);
        if (cachedMovie) {
            return JSON.parse(cachedMovie);
        }

        // Fetch from database
        const movie = await Movie.findByPk(id);
        if (movie) {
            await setAsync(`movie:${id}`, JSON.stringify(movie), 'EX', CACHE_EXPIRY);
            info('Movie retrieved successfully', { movie });
            return movie;
        } else {
            warn('Movie not found', { id });
        }

        return null;
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
        // Check cache first
        const cacheKey = genre ? `movies:genre:${genre}` : 'movies';
        const cachedMovies = await getAsync(cacheKey);
        if (cachedMovies) {
            return JSON.parse(cachedMovies);
        }

        // Fetch from database
        const movies = genre ? await Movie.findAll({ where: { genre } }) : await Movie.findAll();
        
        // Cache the result
        await setAsync(cacheKey, JSON.stringify(movies), 'EX', CACHE_EXPIRY);
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

// Update the cache for movies list and genre-specific lists
const updateMoviesCache = async () => {
    try {
        const movies = await Movie.findAll();
        await setAsync('movies', JSON.stringify(movies), 'EX', CACHE_EXPIRY);
      
        // Cache genre-specific movies
        const genres = [...new Set(movies.map(movie => movie.genre))];
        for (const genre of genres) {
          const genreMovies = movies.filter(movie => movie.genre === genre);
          await setAsync(`movies:genre:${genre}`, JSON.stringify(genreMovies), 'EX', CACHE_EXPIRY);
        }
    } catch (error) {
        _error('Error updating movies cache', {
            message: error.message,
            stack: error.stack,
        });
    }
};

export default {
    createMovie,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getMovies,
};
