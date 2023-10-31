require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);

/**
 * The method allows you to check if you are recovering a token or not
 * @method authenticateToken
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} Returns error if token is not present or not valid
 */

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(` `)[1];

  if (token === `null`) {
    const err = new Error(`Vous devez être connecté pour accéder à cette page.`);
    err.status = 401;
    next(err);
  }
  jwt.verify(token, `951b953c84e2793f553547af3def5757bee1a5d224811898a7e6522a38ee2544aa2aad0874e9922450f9e66bc26206a560b09859b8245f14dd8b8616f9d6bc9b`, (error, user) => {
    if (error) {
      const err = new Error(`Votre session a expiré, merci de vous reconnecter.`);
      err.status = 401;
      next(err);
    }
    req.admin = user;
    next();
  });
};

module.exports = authenticateToken;
