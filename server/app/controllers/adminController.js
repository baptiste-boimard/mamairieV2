require(`dotenv`).config();
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const { dataMapperAdmin } = require(`../models/dataMapper/index`);

/**
 * @type {Object}
 * @export adminController
 * @namespace adminController
 */
const adminController = {

  /** The method allows you to create an administrator in the database
   * @memberof adminController
   * @method signup
   * @param {Object} req.body
   * @param {Object} res
   * @param {Function} next
   * @returns void
   */
  async signup(req, res, next) {
    if (
      req.body.pseudo === `` || req.body.insee === `` || req.body.password === `` || req.body.email === ``
    ) {
      const err = new Error(`Merci de saisir tous les champs.`);
      err.status = 406;
      next(err);
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const townHallId = await dataMapperAdmin.getTownHallId(req.body.insee);
    const existingUser = await dataMapperAdmin.getOneAdmin(req.body.email);
    if (existingUser) {
      if (existingUser.pseudo === req.body.pseudo) {
        const err = new Error(
          `Le pseudo est déjà prit, merci d'en saisir un autre.`,
        );
        next(err);
      } else if (existingUser.email === req.body.email) {
        const err = new Error(
          `Cette adresse email est déjà prise, merci d'en saisir une autre.`,
        );
        next(err);
      }
    }
    if (!existingUser) {
      const userSignup = await dataMapperAdmin.userSignup(
        req.body.pseudo,
        hashPassword,
        req.body.email,
        townHallId,
      );
      res
        .status(200)
        .send(`Votre compte a bien été créé, vous pouvez vous connecter.`);
      if (!userSignup.rowCount) {
        const err = new Error(`La creation de votre compte a échoué, vérifiez vos données.`);
        next(err);
      }
    }
  },
  /**
   * The method allows you to log in as an administrator
   * @memberof adminController
   * @method signup
   * @param {Object} req.body
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} Return token, town_hall_id and admin_id
   */
  async login(req, res, next) {
    const existingUser = await dataMapperAdmin.getOneAdmin(req.body.email);

    if (!existingUser) {
      const err = new Error(`Impossible de récupérer cet administrateur.`);
      next(err);
    }
    const match = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );

    if (match) {
      const data = await dataMapperAdmin.userLogin(
        req.body.email,
        existingUser.password,
      );
      const user = { pseudo: data.pseudo, town_hall_id: data.town_hall_id, admin_id: data.admin_id };
      const townHallId = user.town_hall_id;
      const adminId = user.admin_id;

      // Create Token
      // eslint-disable-next-line max-len
      const accessToken = jwt.sign(user, `951b953c84e2793f553547af3def5757bee1a5d224811898a7e6522a38ee2544aa2aad0874e9922450f9e66bc26206a560b09859b8245f14dd8b8616f9d6bc9b`, { expiresIn: `1800s`, algorithm: `HS256` });

      res.json({ accessToken, townHallId, adminId });
    } else {
      const err = new Error(`La connexion a échouée, vérifier vos données.`);
      next(err);
    }
  },
};

module.exports = adminController;
