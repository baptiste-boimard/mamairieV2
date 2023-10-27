require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);

/**
 * The method allows you to check if you are recovering a token or not
 * @method authenticateToken
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {String} Returns administrator id
 */
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(` `)[1];

//   if (req.route.path === `/admin/me` && token === `null`) {
//     const err = new Error(`Aucun utilisateur admin connecté"`);
//     next(err);
//   }

//   if (token === `null`) {
//     const err = new Error(`Vous devez être connecté pour accéder à cette page.`);
//     err.status = 401;
//     next(err);
//   }

//   // jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
//   //   if (err) {
//   //     const error = new Error(`coucoucoucouo`);
//   //     error.status = 401;
//   //     next(error);
//   //   }
//   //     console.log(user);
//   //     req.admin = user;
//   //     next();
//   // }
//   // try {
//   //   const { user } = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
//   //   console.log(user);
//   // } catch (error) {
//   //   console.log(error);
//   //   next(error);
//   // }

//   jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (error, user) => {
//     if (error) {
//       const err = new Error(`Votre session a expiré, merci de vous reconnecter.`);
//       err.status = 401;
//       next(err);
//     }
//     req.admin = user;
//     next();
//   });
// };
// module.exports = authenticateToken;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) {
    const err = new Error(`Vous devez être connecté pour accéder à cette page.`);
    err.status = 401;
    next(err);
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (error, user) => {
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
