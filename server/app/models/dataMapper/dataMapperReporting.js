const client = require(`../dbClient`);

/**
 * @type {Object}
 * @exports dataMapperReporting
 * @namespace dataMapperReporting
 */
const dataMapperReporting = {
  /**
   * the method allows to return all the reports as administrator
   * @memberof dataMapperReporting
   * @method getAllReport
   * @param {Number} townHallId
   * @returns {Array} Array Returns all reports administrator
   */
  async getAllReport(townHallId) {
    const query = {

      text: `SELECT * FROM reporting as r
              JOIN 
                (SELECT reporting_category.reporting_category_id, reporting_category.name as reporting_category
                FROM reporting_category) as  cat
                ON r.reporting_category_id = cat.reporting_category_id
              JOIN
                (SELECT reporting_status.reporting_status_id, reporting_status.name as reporting_status
                FROM reporting_status) as stat
                ON r.reporting_status_id = stat.reporting_status_id
              WHERE r.town_hall_id = $1
              ORDER BY CASE
                WHEN reporting_status = $2 THEN 1
                WHEN reporting_status = $3 THEN 2
                WHEN reporting_status = $4 THEN 3
                WHEN reporting_status = $5 THEN 4
                END ASC`,
      values: [townHallId, `Non validé`, `Non résolu`, `Résolu`, `En cours`],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * the method allows to return all the reports as visitor
   * @memberof dataMapperReporting
   * @method getAllReportVisitor
   * @param {Number} townHallId
   * @returns {Array} Array Returns all reports visitor
   */
  async getAllReportVisitor(townHallId) {
    const query = {
      text: `SELECT * FROM reporting as r
                JOIN 
                  (SELECT reporting_category.reporting_category_id, reporting_category.name as reporting_category
                  FROM reporting_category) as  cat
                  ON r.reporting_category_id = cat.reporting_category_id
                JOIN
                  (SELECT reporting_status.reporting_status_id, reporting_status.name as reporting_status
                  FROM reporting_status) as stat
                  ON r.reporting_status_id = stat.reporting_status_id
                WHERE r.town_hall_id = $1
                AND NOT reporting_status LIKE '%validé'
                ORDER BY CASE
                WHEN reporting_status = $2 THEN 1
                WHEN reporting_status = $3 THEN 2
                WHEN reporting_status = $4 THEN 3
                END ASC`,
      values: [townHallId, `Non résolu`, `En cours`, `Résolu`],
    };

    const data = await client.query(query);
    return data.rows;
  },
  /**
   * the method allows to return one report as administrator
   * @memberof dataMapperReporting
   * @method getOneReport
   * @param {Number} townHallId
   * @returns {Object} Object Returns one report
   */
  async getOneReport(reportId) {
    const query = {
      text: `SELECT * FROM reporting
            WHERE reporting_id = $1;`,
      values: [reportId],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
  /**
   * The method allows you to delete a report as administrator
   * @memberof dataMapperReporting
   * @method deleteReport
   * @param {Number} id
   * @returns void
   */
  async deleteReport(id) {
    const query = {
      text: `DELETE FROM reporting
            WHERE reporting_id = $1`,
      values: [id],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method is used to update a report as administrator
   * @memberof dataMapperReporting
   * @method modifyReport
   * @param {Object} object
   * @returns void
   */
  async modifyReport(object) {
    const query = {
      text: `UPDATE reporting
            SET admin_text = $1, reporting_status_id = reporting_status.reporting_status_id
            FROM reporting_status
            WHERE reporting_status.name = $2 AND reporting_id = $3`,
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
   * @memberof dataMapperReporting
   * @method PATCH
   * @param {Object} object
   * @returns void
   */
  async postReport(object) {
    const query = {
      text: `INSERT INTO reporting
            (title, email, phonenumber, firstname, lastname, description, ip, image, town_hall_id, reporting_category_id)
            SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, reporting_category.reporting_category_id
            FROM reporting_category
            WHERE reporting_category.name = $10`,
      values: [
        object.title,
        object.email,
        object.phonenumber,
        object.firstname,
        object.lastname,
        object.description,
        object.ip,
        object.image,
        object.town_hall_id,
        object.reporting_category,
      ],
    };
    const data = await client.query(query);
    return data;
  },
};

module.exports = dataMapperReporting;
