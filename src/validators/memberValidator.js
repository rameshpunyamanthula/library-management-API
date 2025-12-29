import Joi from 'joi';

export const createMemberSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  membership_number: Joi.string().required()
});
