const Joi = require("joi");

exports.validateTeam = (team) => {
  const memberSchema = Joi.object({
    name: Joi.string().required(),
    institution: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
    idcardNumber: Joi.string().required(),
  });

  const memberArraySchema = Joi.array().items(memberSchema).min(3).max(3);

  return Joi.object({
    teamName: Joi.string().required(),
    members: memberArraySchema.required(),
    bkashTransactionId: Joi.string().required(),
  }).validate(team);
};

exports.validatePayment = (payment) => {
  const schema = Joi.object({
    transactionId: Joi.string().required().unique(),
    paymentMethod: Joi.string().valid("bkash", "nogod", "roket").required(),
    amount: Joi.number().required(),
    team: Joi.string().required(),
  });

  return schema.validate(payment);
};