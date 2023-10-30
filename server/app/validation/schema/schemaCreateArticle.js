const joi = require(`joi`);

const schemaCreateArticle = joi.object({
  title: joi.string().required().error(new Error(`Le champ titre est requis !`)),
  description: joi.string().required().error(new Error(`Le champ description est requis !`)),
  summary: joi.string().required().error(new Error(`Le champ resumé est requis !`)),
  image: joi.string(),
  author: joi.string().required().error(new Error(`Le champ auteur est requis !`)),
  article_categorie: joi.string(),
  town_hall_id: joi.string(),
});

module.exports = schemaCreateArticle;
