require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ExistingError = require('../errors/ExistingError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d'});
      res.send({ data: user.toJSON(), token })
    })
    .catch(() => {
        next(new UnauthorizedError('Login information is incorrect, check either email or password'))
    })
}

const createUser = (req, res, next) => {
  const { name, avatar, about, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if(user) {
        throw new ExistingError('Current Email has already been registered');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>  User.create({
      name, avatar, about, email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if(err.name === 'ValidationError') {
       next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))   //.send(users))
    .catch(next)
};

const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => {
      throw new NotFound('Requested page not found');
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next)
};

const updateUserData = (req, res, next) => {
  const { body } = req;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError('Please update user info fields')
    })
    .then((user) => res.send({ data: user }))
    .catch(next)
};

const updateAvatar = (req, res, next) => {
  const avatar = req.body.avatar;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    throw new BadRequestError('Please update Avatar');
  }
  return updateUserData(req, res);
};

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User Not Found');
      }
      return res.status(200).send({ data: user });
    })
    .catch(next);
}

module.exports = {
  getAllUsers,
  getUser,
  login,
  createUser,
  updateAvatar,
  updateUser,
  getUserById,
}