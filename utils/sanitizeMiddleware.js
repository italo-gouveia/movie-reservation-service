import xss from 'xss';

/**
 * Middleware function to sanitize input data to prevent XSS attacks.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {Object} req.query - The request query parameters.
 * @param {Object} req.params - The request URL parameters.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {void} - Passes control to the next middleware function.
 */
const sanitizeInputs = (req, res, next) => {
	// Sanitize request body
	if (req.body) {
		Object.keys(req.body).forEach((key) => {
			req.body[key] = xss(req.body[key]);
		});
	}

	// Sanitize query parameters
	if (req.query) {
		Object.keys(req.query).forEach((key) => {
			req.query[key] = xss(req.query[key]);
		});
	}

	// Sanitize URL parameters
	if (req.params) {
		Object.keys(req.params).forEach((key) => {
			req.params[key] = xss(req.params[key]);
		});
	}

	next();
};

export default sanitizeInputs;
