const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const InvalidRequestError = require('../errors/invalid-request-error');
const NotFoundError = require('../errors/not-found-err');
const InvalidAuthError = require('../errors/invalid-auth-error');
const MongoConflictError = require('../errors/mongo-conflict-error');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else if (err.name === 'Error') {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else if (err.name === 'Error') {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new MongoConflictError('Указанный email занят другим пользователем'));
      } else if (err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные при создании пользователя'));
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация прошла успешно, пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(() => {
      next(new InvalidAuthError('Необходима авторизация'));
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: false, // если пользователь не найден, он будет создан
  })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send({
      name: user.name, about: user.about, avatar: user.avatar, _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.name === 'Error') {
        next(err);
      }
    });
};

module.exports.updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.name === 'Error') {
        next(err);
      }
    });
};
