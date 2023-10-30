const { dataMapperReporting } = require(`../models/dataMapper/index`);

/**
 * @type {object}
 * @export adminReportingController
 * @namespace adminReportingController
 */
const adminReportingController = {
  /**
   * The method returns all reports for administrator
   * @memberof adminReportingController
   * @method allReporting
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Array} Return all reports for Administrator
   */
  async allReporting(req, res, next) {
    if (parseInt(req.params.town_hall_id, 10) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'êtes pas autorisé à accéder à cette page.`,
      );
      err.status = 401;
      next(err);
    }
    const Allreporting = await dataMapperReporting.getAllReport(
      req.params.town_hall_id,
    );
    if (Allreporting) {
      res.json(Allreporting).status(200);
    } else {
      const err = new Error(`Impossible de récupérer tous les signalements.`);
      next(err);
    }
  },
  /**
   * The method returns all visitor reports
   * @memberof adminReportingController
   * @method allReportingVisitor
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Array} Return all reports visitor
   */
  async allReportingVisitor(req, res, next) {
    const reportings = await dataMapperReporting.getAllReportVisitor(
      parseInt(req.params.town_hall_id, 10),
    );
    if (reportings) {
      res.json(reportings).status(200);
    } else {
      const err = new Error(
        `Impossible de récupérer tous les signalements.`,
      );
      next(err);
    }
  },
  /**
   * The method returns one reports
   * @memberof adminReportingController
   * @method oneReporting
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} Return one reports visitor
   */
  async oneReporting(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'êtes pas autorisé à accéder à cette page.`,
      );
      err.status = 401;
      next(err);
    }
    const report = await dataMapperReporting.getOneReport(
      req.params.reporting_id,
    );
    if (report) {
      res.json(report).status(200);
    } else {
      const err = new Error(
        `Impossible de récupérer le signalement.`,
      );
      next(err);
    }
  },
  /**
   * The method allows you to delete a report as administrator
   * @memberof adminReportingController
   * @method deleteReporting
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns void
   */
  async deleteReporting(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'êtes pas autorisé à accéder à cette page.`,
      );
      err.status = 401;
      next(err);
    }
    const deleteReport = await dataMapperReporting.getOneReport(req.params.reporting_id);
    const report = await dataMapperReporting.deleteReport(
      req.params.reporting_id,
    );
    if (report.rowCount) {
      res.status(200).send(`Le signalement "${deleteReport.title}" est bien supprimé !`);
    } else {
      const err = new Error(
        `Impossible de supprimer le signalement.`,
      );
      next(err);
    }
  },
  /**
   * The method allows you to modify a report as administrator
   * @memberof adminReportingController
   * @method modifyReporting
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns void
   */
  async modifyReporting(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'êtes pas autorisé à accéder à cette page.`,
      );
      err.status = 401;
      next(err);
    }
    const getReport = await dataMapperReporting.getOneReport(req.params.reporting_id);
    const values = {
      admin_text: req.body.admin_text,
      reporting_statut: req.body.reporting_statut,
      reporting_id: req.params.reporting_id,

    };
    const report = await dataMapperReporting.modifyReport(values);
    if (report.rowCount) {
      res.status(200).send(`Le signalement "${getReport.title}" a bien été mis à jour.`);
    } else {
      const err = new Error(
        `Impossible de modifier le signalement.`,
      );
      next(err);
    }
  },
  /**
   * The method allows you to post a report as a visitor
   * @memberof adminReportingController
   * @method postReporting
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns void
   */
  async postReporting(req, res, next) {
    const values = {
      title: req.body.title,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      description: req.body.description,
      ip: req.headers[`x-forwarded-for`]?.split(`,`).shift() || req.socket?.remoteAddress,
      image: req.body.user_image,
      town_hall_id: req.params.town_hall_id,
      reporting_category: req.body.reporting_category,
    };
    const report = await dataMapperReporting.postReport(values);
    if (report.rowCount) {
      res.status(200).send(`Le signalement ${req.body.title} de ${req.body.firstname} ${req.body.lastname} est effectué.`);
    } else {
      const err = new Error(
        `Impossible de publier votre signalement.`,
      );
      next(err);
    }
  },
};

module.exports = adminReportingController;
