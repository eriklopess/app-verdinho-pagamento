import Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().required(),
  receiver: Joi.string().email().required(),
  amount: Joi.number().integer().min(1).required(),
});
