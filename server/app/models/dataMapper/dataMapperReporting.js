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
   * @menberof dataMapperReporting
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
   * @menberof dataMapperReporting
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
   * @menberof dataMapperReporting
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
   * @menberof dataMapperReporting
   * @method modifyReport
   * @param {Object} object
   * @returns void
   */
  async modifyReport(object) {
    const query = {
      text: `UPDATE reporting
      SET admin_text = $1, reporting_status_id = $2
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
   * @method PATCH
   * @param {Object} object
   * @returns void
   */
  async postReport(object) {
    const query = {
      text: `INSERT INTO reporting
            (title, email, phonenumber, firstname, lastname, description, ip, image, reporting_category_id, town_hall_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      // eslint-disable-next-line max-len
      values: [
        object.title,
        object.email,
        object.phonenumber,
        object.firstname,
        object.lastname,
        object.description,
        object.ip,
        object.image,
        object.reporting_category_id,
        object.town_hall_id,
      ],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * Method to get reporting_status_id
   * @memberof dataMapperReporting
   * @method GET
   * @param string statusName
   * @returns number reporting_status_id
   */
  async getOneReportingStatus(statusName) {
    const query = {
      text: `SELECT reporting_status_id
            FROM reporting_status
            WHERE name = $1`,
      values: [statusName],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
  /**
   * Method to get reporting_category_name
   * @memberof dataMapperReporting
   * @param string categoryName
   * @returns number reporting_category_id
   */
  async getOneReportingCategory(categoryName) {
    const query = {
      text: `SELECT reporting_category_id
            FROM reporting_category
            WHERE name = $1`,
      values: [categoryName],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
};

module.exports = dataMapperReporting;
