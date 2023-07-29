import Joi from 'joi';

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });

const userSchema = Joi.object({
    id: Joi.number(),
    nombre: Joi.string().pattern(/^[A-Za-z]+$/).min(5).max(45).required(),
    balance: Joi.number().positive().required()
});

const transferenciaSchema = Joi.object({
    emisor: Joi.string().pattern(/^[A-Za-z]+$/).required(),
    receptor: Joi.string().pattern(/^[A-Za-z]+$/).required(),
    monto: Joi.number().positive().required()
});

export const validateUser = validator(userSchema);
export const validateTransferencia = validator(transferenciaSchema);