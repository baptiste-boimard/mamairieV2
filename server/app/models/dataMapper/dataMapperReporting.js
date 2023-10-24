const client = require(`../dbClient`);

/**
 * @type {Object}
 * @exports dataMapperReporting
 * @namespace dataMapperReporting
 */
const dataMapperReporting = {
  /**
   * the method allows to return all the reports as administrator
   * @menberof dataMapperReporting
   * @method getAllReport
   * @param {Number} townHallId
   * @returns {Array} Array Returns all reports administrator
   */
  async getAllReport(townHallId) {
    const query = {
      // text: `SELECT * FROM signalement
      // eslint-disable-next-line max-len
      //       WHERE mairie_id = $1 ORDER BY reporting_statut = $2, reporting_statut = $3, reporting_statut = $4, reporting_statut = $5 DESC;`,
      text: `SELECT * FROM signalement as s
              JOIN 
                (SELECT signalement_categorie.id_signalement_categorie, signalement_categorie.nom as signalement_categorie_nom
                FROM signalement_categorie) as  cat
                ON s.signalement_categorie_id = cat.id_signalement_categorie
              JOIN
                (SELECT signalement_status.id_signalement_status, signalement_status.nom as signalement_status_nom
                FROM signalement_status) as stat
                ON s.signalement_status_id = stat.id_signalement_status
              WHERE s.mairie_id = $1
              ORDER BY CASE
                WHEN signalement_status_nom = $2 THEN 1
                WHEN signalement_status_nom = $3 THEN 2
                WHEN signalement_status_nom = $4 THEN 3
                WHEN signalement_status_nom = $5 THEN 4
                END ASC`,
      values: [townHallId, `Non validé`, `Non résolu`, `Résolu`, `En cours`],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * the method allows to return all the reports as visitor
   * @menberof dataMapperReporting
   * @method getAllReportVisitor
   * @param {Number} townHallId
   * @returns {Array} Array Returns all reports visitor
   */
  async getAllReportVisitor(townHallId) {
    const query = {
      text: `SELECT * FROM signalement as s
              JOIN 
                (SELECT signalement_categorie.id_signalement_categorie, signalement_categorie.nom as signalement_categorie_nom
                FROM signalement_categorie) as  cat
                ON s.signalement_categorie_id = cat.id_signalement_categorie
              JOIN
                (SELECT signalement_status.id_signalement_status, signalement_status.nom as signalement_status_nom
                FROM signalement_status) as stat
                ON s.signalement_status_id = stat.id_signalement_status
              WHERE s.mairie_id = $1
              AND NOT signalement_status_nom LIKE '%validé'
              ORDER BY CASE
                WHEN signalement_status_nom = $2 THEN 1
                WHEN signalement_status_nom = $3 THEN 2
                WHEN signalement_status_nom = $4 THEN 3
                END ASC`,
      values: [townHallId, `Non résolu`, `En cours`, `Résolu`],
    };

    const data = await client.query(query);
    return data.rows;
  },
  /**
   * the method allows to return one report as administrator
   * @menberof dataMapperReporting
   * @method getOneReport
   * @param {Number} townHallId
   * @returns {Object} Object Returns one report
   */
  async getOneReport(reportId) {
    const query = {
      text: `SELECT * FROM signalement
      WHERE id_signalement = $1;`,
      values: [reportId],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
  /**
   * The method allows you to delete a report as administrator
   * @menberof dataMapperReporting
   * @method deleteReport
   * @param {Number} id
   * @returns void
   */
  async deleteReport(id) {
    const query = {
      text: `DELETE FROM signalement
            WHERE id_signalement = $1`,
      values: [id],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method is used to update a report as administrator
   * @menberof dataMapperReporting
   * @method modifyReport
   * @param {Object} object
   * @returns void
   */
  async modifyReport(object) {
    const query = {
      text: `UPDATE reporting
      SET admin_text = $1, reporting_statut = $2
      WHERE reporting_id = $3; `,
      // eslint-disable-next-line max-len
      values: [
        object.admin_text,
        object.reporting_statut,
        object.reporting_id,
      ],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method is used to post a report as a visitor
   * @menberof dataMapperReporting
   * @method modifyReport
   * @param {Object} object
   * @returns void
   */
  async postReport(object) {
    const query = {
      text: `INSERT INTO reporting
            (title, email, phonenumber, first_name, last_name, user_text, user_image, reporting_category, user_ip, town_hall_id)
      VALUES ($1, $2, $3, $4,  $5,  $6, $7, $8, $9, $10)`,
      // eslint-disable-next-line max-len
      values: [
        object.title,
        object.email,
        object.phonenumber,
        object.first_name,
        object.last_name,
        object.user_text,
        object.user_image,
        object.reporting_category,
        object.user_ip,
        object.town_hall_id,
      ],
    };
    const data = await client.query(query);
    return data;
  },
};

module.exports = dataMapperReporting;
