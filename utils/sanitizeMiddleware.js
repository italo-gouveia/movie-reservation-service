import xss from 'xss';

// Sanitize inputs middleware
const sanitizeInputs = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = xss(req.body[key]);
    });
  }

  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      req.query[key] = xss(req.query[key]);
    });
  }

  if (req.params) {
    Object.keys(req.params).forEach((key) => {
      req.params[key] = xss(req.params[key]);
    });
  }

  next();
};

export default sanitizeInputs;
