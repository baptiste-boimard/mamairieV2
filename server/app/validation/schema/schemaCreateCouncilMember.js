const joi = require(`joi`);

const schemaCreateCouncilMember = joi.object({
  firstname: joi.string().required().error(new Error(`Le Prénom est requis !`)),
  lastname: joi.string().required().error(new Error(`Le Nom de famille est requis !`)),
  role: joi.string().required().error(new Error(`Le Role est requis !`)),
  photo: joi.string(),
  town_hall_id: joi.number().required(),
}).required().min(4);

module.exports = schemaCreateCouncilMember;
