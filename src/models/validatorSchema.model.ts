import joi from "joi";

const userSchema = joi.object({
  username: joi.string().required().required().lowercase(),
  email: joi.string().email().required().lowercase(),
  password: joi.string().min(8).required(),
});

export default userSchema;
