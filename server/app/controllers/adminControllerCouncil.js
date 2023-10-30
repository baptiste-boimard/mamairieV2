const dataMapperCouncil = require(`../models/dataMapper/dataMapperCouncil`);

/**
 * @type {Object}
 * @export adminControllerCouncil
 * @namespace adminControllerCouncil
 */
const adminControllerCouncil = {
  /** The method returns the list of municipal councilors and the mayor as visitor
   * @memberof adminControllerCouncil
   * @method allCouncil
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Array} Return the municipal staff
   */
  async allCouncil(req, res, next) {
    const townHallStaff = await dataMapperCouncil.getAllCouncil(
      parseInt(req.params.town_hall_id, 10),
    );
    if (townHallStaff) {
      res.json(townHallStaff).status(200);
    } else {
      const err = new Error(
        `Impossible de récupèrer les conseillers.`,
      );
      next(err);
    }
  },
  /** this method posts a new advisor member as administrator
   * @memberof adminControllerCouncil
   * @method postOneMember
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns void
   */
  async postOneMember(req, res, next) {
    const member = {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      role: req.body.role,
      photo: req.body.photo,
      townHallId: req.params.town_hall_id,
    };
    const result = await dataMapperCouncil.postMemberCouncil(member);
    if (result.rowCount) {
      res.status(200).send(`Votre ajout d'un conseiller à été effectué.`);
    } else {
      const err = new Error(
        `L'ajout d'un conseiller a échoué`,
      );
      next(err);
    }
  },
  /**
    this method removes a board member by his id
  * @method deleteMemberCouncil
  * @param {Object} req
  * @param {Object} res
  * @param {Function} next
  * @returns void
  */
  async deleteMemberCouncil(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'avez pas accès à cette page.`,
      );
      err.status = 401;
      next(err);
    }
    const report = await dataMapperCouncil.deleteMember(req.params.town_hall_staff_id);
    if (report.rowCount) {
      res.status(200).send(`Le conseiller à bien été supprimer.`);
    } else {
      const err = new Error(
        `La suppression du membre est impossible.`,
      );
      next(err);
    }
  },
  /**
    this method modify a board member by his id
  * @memberof adminControllerCouncil
  * @method modifyMemberCouncil
  * @param {Object} req
  * @param {Object} res
  * @param {Function} next
  * @returns void
  */

  async modifyMemberCouncil(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'avez pas accès à cette page.`,
      );
      err.status = 401;
      next(err);
    }
    const values = {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      role: req.body.role,
      photo: req.body.photo,
      townHallStaffId: req.params.town_hall_staff_id,
    };
    const report = await dataMapperCouncil.modifyCouncil(values);
    if (report.rowCount) {
      res.status(200).send(`La mise à jour du conseiller est un succès`);
    } else {
      const err = new Error(
        `La mise à jour à échouée`,
      );
      next(err);
    }
  },
};

module.exports = adminControllerCouncil;
