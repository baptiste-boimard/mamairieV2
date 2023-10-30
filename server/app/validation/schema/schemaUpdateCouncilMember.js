const joi = require(`joi`);

const schemaUpdateCouncilMember = joi.object({
  lastname: joi.string().required().error(new Error(`Le nom de famille est requis !`)),
  firstname: joi.string().required().error(new Error(`Le prénom est requis !`)),
  photo: joi.string(),
  role: joi.string().required().error(new Error(`Le role est requis !`)),
  town_hall_id: joi.number().required(),
}).required().min(4);

module.exports = schemaUpdateCouncilMember;
