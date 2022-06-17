import Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().empty().required(),
  password: Joi.string().empty().required(),
  cpf: Joi.string().min(11).required(),
  role: Joi.string().empty().required(),
});
