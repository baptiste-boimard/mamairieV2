const debug = require(`debug`)(`HANDLEERROR`);

/**
 * The object allows you to create
 * a customize error and send it to the front end
 * @type {Object}
 * @namespace handleError
 * @export handleError
 * @param {Object} error
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const handleError = async (error, req, res, next) => {
  debug(error.message);
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status,
      message: error.message,
    },
  });
  next();
};

module.exports = handleError;
