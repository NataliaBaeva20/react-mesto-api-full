const express = require('express');

const { cardValidator, idValidator } = require('../middlewares/validation');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', cardValidator, createCard);
cardRoutes.delete('/:id', idValidator, deleteCard);
cardRoutes.put('/:id/likes', idValidator, likeCard);
cardRoutes.delete('/:id/likes', idValidator, dislikeCard);

module.exports = cardRoutes;
