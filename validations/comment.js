import Joi from "joi";
import joiobjectid from "joi-objectid";
Joi.objectId = joiobjectid(Joi);

const commentSchema = Joi.object({
  content: Joi.string().max(123).required(),
  productId: Joi.objectId().required(),
});

export default commentSchema;
