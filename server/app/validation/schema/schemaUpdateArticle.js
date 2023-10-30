const joi = require(`joi`);

const schemaCreateArticle = joi.object({
  title: joi.string().required().error(new Error(`Le titre est requis !`)),
  description: joi.string().required().error(new Error(`La description est requise !`)),
  summary: joi.string().required().error(new Error(`Le resumé est requis !`)),
  image: joi.string(),
  author: joi.string().required().error(new Error(`L'auteur est requis !`)),
  article_categorie: joi.string(),
  article_id: joi.string(),
});

module.exports = schemaCreateArticle;
