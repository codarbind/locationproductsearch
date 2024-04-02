import Joi from "joi";
import joiobjectid from "joi-objectid";
Joi.objectId = joiobjectid(Joi);

const replySchema = Joi.object({
  content: Joi.string().max(123).required(),
  commentId: Joi.objectId().required(),
});

export default replySchema;
