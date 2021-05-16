const express = require('express');

const { userInfoValidavor, userAvatarValidator, idValidator } = require('../middlewares/validation');

const {
  getUsers, getUserById, getCurrentUser, updateUser, updateAvatarUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:id', idValidator, getUserById);
userRoutes.patch('/me', userInfoValidavor, updateUser);
userRoutes.patch('/me/avatar', userAvatarValidator, updateAvatarUser);

module.exports = userRoutes;
