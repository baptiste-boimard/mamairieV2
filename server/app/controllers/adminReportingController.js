const { dataMapperReporting } = require(`../models/dataMapper/index`);
// const debug = require(`debug`)(`ADMINREPORT`);
/**
 * @type {object}
 * @export adminReportingController
 * @namespace adminReportingController
 */
const adminReportingController = {
  /**
   * The method returns all administrator reports
   * @menberof adminReportingController
   * @method allReporting
   * @param {Object} req
   * @param {Object} res
   * @returns Return all reports Administrator
   */
  async allReporting(req, res, next) {
    console.log(`allreporiting`, req.params);
    console.log(`admin`, req.admin);
    if (parseInt(req.params.town_hall_id, 10) !== req.admin.town_hall_id) {
      const err = new Error(
        `Vous n'êtes pas autorisé à accéder à cette page.`,
      );
      err.status = 401;
      next(err);
    }
    console.log('avant request', req.params.town_hall_id);
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
   * @menberof adminReportingController
   * @method allReportingVisitor
   * @param {Object} req
   * @param {Object} res
   * @returns Return all reports visitor
   */
  async allReportingVisitor(req, res, next) {
    // eslint-disable-next-line max-len
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
   * @menberof adminReportingController
   * @method oneReporting
   * @param {Object} req
   * @param {Object} res
   * @returns Return one reports visitor
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
   * @menberof adminReportingController
   * @method deleteReporting
   * @param {Object} req
   * @param {Object} res
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
   * @menberof adminReportingController
   * @method modifyReporting
   * @param {Object} req
   * @param {Object} res
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
    const getStatus = await dataMapperReporting.getOneReportingStatus(req.body.reporting_statut);
    const getReport = await dataMapperReporting.getOneReport(req.params.reporting_id);
    const values = {
      admin_text: req.body.admin_text,
      reporting_statut: getStatus.reporting_status_id,
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
   * @menberof adminReportingController
   * @method postReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async postReporting(req, res, next) {
    const reportingCategory = await dataMapperReporting.getOneReportingCategory(req.body.reporting_category);
    const values = {
      title: req.body.title,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      description: req.body.description,
      ip: req.headers[`x-forwarded-for`]?.split(`,`).shift() || req.socket?.remoteAddress,
      image: req.body.user_image,
      reporting_category_id: reportingCategory.reporting_category_id,
      town_hall_id: req.params.town_hall_id,
    };
    const report = await dataMapperReporting.postReport(values);
    if (report.rowCount) {
      res.status(200).send(`Le signalement ${req.body.title} de ${req.body.firstname} est effectué.`);
    } else {
      const err = new Error(
        `Impossible de poster votre signalement.`,
      );
      next(err);
    }
  },
};

module.exports = adminReportingController;
