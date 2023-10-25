const client = require(`../dbClient`);

/**
 *@type {Object}
 *@export dataMapperArticle
 *@namespace dataMapperArticle
 */
const dataMapperArticle = {
  /**
   * The method returns the list of all articles as visitor
   * @menberof getAllArticleAdmin
   * @method getAllArticleAdmin
   * @param {Number} townHallId
   * @returns {Object} Return all articles
   */
  async getAllArticleAdmin(townHallId) {
    const query = {
      text: `SELECT * FROM article
            WHERE town_hall_id = $1;`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * The method returns one article as visitor
   * @menberof getAllArticleAdmin
   * @method getOneArticle
   * @param {Number} articleId
   * @returns Return one article
   */
  async getOneArticle(articleId) {
    const query = {
      text: `SELECT * FROM article
              WHERE article_id = $1;`,
      values: [articleId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * The method delete one article as administrator
   * @menberof getAllArticleAdmin
   * @method deleteArticle
   * @param {Number} id
   * @returns void
   */
  async deleteArticle(id) {
    const query = {
      text: `DELETE FROM article
              WHERE article_id = $1`,
      values: [id],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method allows to update an article as administrator
   * @menberof getAllArticleAdmin
   * @method modifyArticle
   * @param {object} object
   * @returns void
   */
  async modifyArticle(object) {
    const query = {
      text: `UPDATE article
      SET title = $1, description = $2, summary = $3, image = $4, author = $5, article_category_id = $6, article_color = $7
      WHERE article_id = $8; `,
      values: [
        object.title,
        object.description,
        object.summary,
        object.image,
        object.author,
        object.article_category_id,
        object.article_id,
      ],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method allows you to post an article not as administrator
   * @menberof getAllArticleAdmin
   * @method postArticle
   * @param {object} object
   * @returns void
   */
  async postArticle(object) {
    const query = {
      text: `INSERT INTO article
            (title, description, summary, image, author, article_category, admin_id, town_hall_id)
      VALUES ($1, $2, $3, $4,  $5,  $6, $7, $8)`,
      values: [
        object.title,
        object.description,
        object.summary,
        object.image,
        object.author,
        object.article_categorie,
        object.admin_id,
        object.town_hall_id,
      ],
    };
    const data = await client.query(query);
    return data;
  },

  /**
   * The method allows to retrieve all the articles as visitor
   * @menberof getAllArticleAdmin
   * @method postArticle
   * @param {object} object
   * @returns {array}
   */
  async getAllArticle(townHallId) {
    const query = {
      text: `SELECT * FROM article
            WHERE town_hall_id = $1;`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },

  /**
   * Method to get article_category_id
   * @memberof getOneArticleCategory
   * @method Get
   * @param  {string} articleCategoryName
   * @returns {number}
   */
  async getOneArticleCategory(articleCategoryName) {
    const query = {
      text: `SELECT article_category_id FROM article_category
            WHERE name = $1`,
      values: [articleCategoryName],
    };
    const data = await client.query(query);
    return data.rows[0];
  },
};

module.exports = dataMapperArticle;
