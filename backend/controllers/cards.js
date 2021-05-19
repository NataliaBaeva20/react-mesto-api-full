const Card = require('../models/card');

const InvalidRequestError = require('../errors/invalid-request-error');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequestError(err.message));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (card.owner._id.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => {
            res.send(card);
          });
      } else {
        throw new ForbiddenError('У вас нет прав на удаление этой карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else if (err.name === 'Error') {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Запрашиваемая карточка для постановки лайка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else if (err.name === 'Error') {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Запрашиваемая карточка для снятия лайка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else if (err.name === 'Error') {
        next(err);
      }
    });
};
