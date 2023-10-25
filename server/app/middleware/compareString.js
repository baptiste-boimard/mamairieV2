const client = require(`../models/dbClient`);
const stringSimilarity = require(`string-similarity`);
const leoProfanity = require(`leo-profanity`);
const frenchBadwordsList = require(`french-badwords-list`);

leoProfanity.clearList();
leoProfanity.add(frenchBadwordsList.array);

/**
 * object contains methods to filter reports
 * @type {object}
 * @export compareString
 * @namespace compareString
 */
const compareString = {
  /**
   * la method permet de récupérer adresse ip
   * @memberof compareString
   * @method getIp
   * @param {Object} req
   * @returns {String} ip
   */
  async getIp(req) {
    const ip = req.headers[`x-forwarded-for`]?.split(`,`).shift()
  || req.socket?.remoteAddress;
    return ip;
  },
  /**
   * Permet de savoir combien de fois l'ip a été utilisé auj pour poster un signalement
   * @memberof compareString
   * @method verifyIp
   * @param {String} ip
   * @param {Object} req
   * @returns {Number}
   */
  async verifyIp(ip, req) {
    const id = parseInt(req.params.town_hall_id, 10);
    const query = {
      text: `SELECT COUNT(*) FROM reporting WHERE ip = $1 AND town_hall_id = $2 AND created_at > CAST(NOW() AS DATE) - 1`,
      values: [ip, id],
    };
    const result = await client.query(query);
    return Number(result.rows[0].count);
  },
  /**
   * Permet de vérifier si le contenu du titre et de la description
   * possède des similarité avec d'autres signalement d'auj
   * Vérifie si un même ip à déjà posté plus de 3 fois auj
   * Test si le titre et la description ne contient pas d'insulte
   * @memberof compareString
   * @method verifyString
   * @param {Object} req
   * @param {Function} next
   * @returns void
   */
  async verifyString(req, _, next) {
    const titleUser = req.body.title;
    const stringUser = req.body.description;
    const id = req.params.town_hall_id;
    const noBadWords = leoProfanity.check(stringUser);
    const noBadTitle = leoProfanity.check(titleUser);
    const ip = await compareString.getIp(req);
    const verifyIp = await compareString.verifyIp(ip, req);
    if (verifyIp >= 5000) {
      const err = new Error(`Vous avez déjà posté 3 fois aujourd'hui`);
      next(err);
    } else if (noBadWords === true) {
      const err = new Error(`Les insultes ne sont pas acceptées !!`);
      next(err);
    } else if (noBadTitle === true) {
      const err = new Error(`Les insultes ne sont pas acceptées !!`);
      next(err);
    } else {
      const query = {
        text: `SELECT description FROM reporting WHERE town_hall_id = $1 AND created_at > CAST(NOW() AS DATE) - 1`,
        values: [id],
      };
      const allUserText = await client.query(query);

      const AllUserTextString = [` `];
      // eslint-disable-next-line no-restricted-syntax
      for (const rows of allUserText.rows) {
        AllUserTextString.push(rows.description);
      }
      const matches = stringSimilarity.findBestMatch(stringUser, AllUserTextString);
      if (matches.bestMatch.rating > 0.8) {
        const err = new Error(`Le contenu du signalement est très similaire à un autre signalement`);
        next(err);
      } else {
        next();
      }
    }
  },
};

module.exports = compareString;
