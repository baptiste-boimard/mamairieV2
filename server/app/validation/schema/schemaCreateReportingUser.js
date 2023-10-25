/* eslint-disable newline-per-chained-call */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
const joi = require(`joi`);

const schemaCreateReportingUser = joi.object({
  reporting_category: joi.string().required().error(new Error(`La catégorie du signalement est requise !`)),
  title: joi.string().min(5).max(50).required().error(new Error(`Le titre est requis et doit comprendre entre 5 et 50 caractères`)),
  description: joi.string().required().error(new Error(`Le texte du signalement est requis !`)),
  email: joi.string().email().required().error(new Error(`Le format de votre email ne correspond pas à celui attendu example@gmail.fr !`)),
  firstname: joi.string().required().max(20).error(new Error(`Le prénom dans le signalement est requis et ne doit pas dépasser 20 caractères !`)),
  lastname: joi.string().required().max(20).error(new Error(`Le nom de famille dans le signalement est requis et ne doit pas dépasser 20 caractères!`)),
  phonenumber: joi.string().min(10).max(10).allow(``).error(new Error(`Le numéros de téléphone doit contenir 10 chiffres`)),
  town_hall_id: joi.number(),
}).required().min(5);

module.exports = schemaCreateReportingUser;
