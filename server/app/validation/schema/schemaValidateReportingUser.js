const joi = require(`joi`);

const schemaValidateReportingUser = joi.object({
  description: joi.string().min(10).required().error(new Error(`le texte de l'administrateur est requis !`)),
  reporting_status: joi.string().required().error(new Error(`le statut du signalement est requis !`)),
}).required().min(2);

module.exports = schemaValidateReportingUser;
