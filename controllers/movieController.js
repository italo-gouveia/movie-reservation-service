import movieService from '../services/movieService';
import { error as _error } from '../logger'; // Import the logger

const addMovie = async (req, res) => {
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
		});
		res.status(500).json({ message: 'Error adding movie' });
	}
};

const updateMovie = async (req, res) => {
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
		});
		res.status(500).json({ message: 'Error updating movie' });
	}
};

const deleteMovie = async (req, res) => {
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
		});
		res.status(500).json({ message: 'Error deleting movie' });
	}
};

const getMovieById = async (req, res) => {
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
		});
		res.status(500).json({ message: 'Error retrieving movie' });
	}
};

const getMovies = async (req, res) => {
	try {
		const { genre } = req.query;
		const movies = await movieService.getMovies(genre);
		res.status(200).json(movies);
	} catch (error) {
		_error('Error in getMovies controller', {
			message: error.message,
			stack: error.stack,
		});
		res.status(500).json({ message: 'Error retrieving movies' });
	}
};

export default {
	addMovie,
	updateMovie,
	deleteMovie,
	getMovieById,
	getMovies,
};
