import Joi from 'joi';

export const createBookSchema = Joi.object({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().optional(),
  total_copies: Joi.number().integer().min(1).required(),
  available_copies: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref('total_copies'))
    .required()
});

export const updateBookSchema = Joi.object({
  isbn: Joi.string().optional(),
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  category: Joi.string().optional(),
  total_copies: Joi.number().integer().min(1).optional(),
  available_copies: Joi.number().integer().min(0).optional()
});
