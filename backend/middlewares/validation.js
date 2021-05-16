const { celebrate, Joi } = require('celebrate');

const signupValidavor = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@/]*#?)?(?:.(?:jpg|jpeg|png))?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userInfoValidavor = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@/]*#?)?(?:.(?:jpg|jpeg|png))?/),
  }),
});

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
});

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).pattern(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@/]*#?)?(?:.(?:jpg|jpeg|png))?/),
  }),
});

module.exports = {
  signupValidavor,
  loginValidator,
  userInfoValidavor,
  userAvatarValidator,
  cardValidator,
  idValidator,
};
