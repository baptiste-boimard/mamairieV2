const { dataMapperArticle } = require(`../models/dataMapper/index`);

/**
 * @type {Object}
 * @namespace adminControllerArticle
 * @exports adminControllerArticle
 */
const adminControllerArticle = {

  /** The method returns the list of all items
   * @memberof adminControllerArticle
   * @method allArticle
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Array} Return all articles
   */
  async allArticle(req, res, next) {
    const articles = await dataMapperArticle.getAllArticleAdmin(
      req.params.town_hall_id,
    );
    if (articles) {
      res.json(articles).status(200);
    } else {
      const err = new Error(`Impossible de récupérer la liste des articles`);
      next(err);
    }
  },
  /**
   * The method returns an article
   * @memberof adminControllerArticle
   * @method oneArticle
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} Return one article
   */
  async oneArticle(req, res, next) {
    const articles = await dataMapperArticle.getOneArticle(
      req.params.article_id,
    );
    if (articles) {
      res.json(articles).status(200);
    } else {
      const err = new Error(`Impossible de récupérer l'article`);
      next(err);
    }
  },
  /** The method allows you to delete an article as administrator
   * @memberof adminControllerArticle
   * @method deleteArticle
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns void
   */
  async deleteArticle(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(`Vous n'avez pas accès à cette page.s`);
      err.status = 401;
      next(err);
    }
    const articles = await dataMapperArticle.deleteArticle(
      req.params.article_id,
    );
    if (articles.rowCount) {
      res.status(200).send(`L'article est bien supprimer.`);
    } else {
      const err = new Error(`La suppression de l'article n'est pas possible.`);
      next(err);
    }
  },
  /**
   * The method allows you to modify an article as administrator
   * @memberof adminControllerArticle
   * @method modifyArticle
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return void
   */
  async modifyArticle(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(`Vous n'avez pas accès à cette page.`);
      err.status = 401;
      next(err);
    }

    if (
      req.body.title === `` || req.body.description === `` || req.body.author === ``
    ) {
      const err = new Error(`La saisie des champs Titre, Description et Auteur est obligatoire`);
      err.status = 406;
      next(err);
    }

    const articleCategory = await dataMapperArticle.getOneArticleCategory(req.body.article_categorie);

    const values = {
      title: req.body.title,
      description: req.body.description,
      summary: req.body.summary,
      image: req.body.image,
      author: req.body.author,
      article_category_id: articleCategory,
      article_id: req.params.article_id,
    };
    const report = await dataMapperArticle.modifyArticle(values);
    if (report.rowCount) {
      res.status(200).send(`La mise à jour s'est bien passée.`);
    } else {
      const err = new Error(`La mise à jour de l'article n'est pas possible.`);
      next(err);
    }
  },
  /**
   * The method allows you to create an article as administrator
   * @memberof adminControllerArticle
   * @method postArticle
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns void
   */
  async postArticle(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(`Vous n'avez pas accès à cette page.`);
      err.status = 401;
      next(err);
    }

    const articleCategory = await dataMapperArticle.getOneArticleCategory(req.body.article_category);

    const values = {
      title: req.body.title,
      description: req.body.description,
      summary: req.body.summary,
      image: req.body.image,
      author: req.body.author,
      article_category: articleCategory,
      admin_id: req.admin.admin_id,
      town_hall_id: req.admin.town_hall_id,
    };
    const report = await dataMapperArticle.postArticle(values);
    if (report.rowCount) {
      res.status(200).send(`Votre article a été publié`);
    } else {
      const err = new Error(`Votre article ne peut être publié`);
      next(err);
    }
  },
};

module.exports = adminControllerArticle;
