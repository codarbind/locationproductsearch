import Joi from "joi";

const uploadproductSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
    size: Joi.number()
      .max(5 * 1024 * 1024)
      .required(),
  }).required(),
  location: Joi.string().required(),
});
export default uploadproductSchema;
