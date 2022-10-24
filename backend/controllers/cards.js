const Card = require('../models/card');
const ExistingError = require('../errors/ExistingError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ForbiddenError = require('../errors/ForbiddenError');
const errorHandler = require('../middleware/errorhandler');
const NotFoundError = require('../errors/NotFoundError');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(errorHandler);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner,  //likes removed
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      logger(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else if (err.status === 500) {
        next(new errorHandler('Internal Server Error ...'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Card Not Found!');
    })
    .then((card) => {
      if(!card.owner.equals(req.user._id)) {
       next(new ForbiddenError('This is not your card to delete!'));
      } else {
        Card.findByIdAndRemove(cardId)
          .then((card) => res.send(card));
      }
    })
    .catch(next);
};

const updateLikes = (req, res, next, operator) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { [operator]: { likes: userId } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Card Id is not found');
    })
    .then((CARD) => res.send({ data: CARD }))
    .catch((err) => {
      if (err.name === 'Cast Error') {
        next(new ForbiddenError('Card Id is not correct'));
      } else if (err.status === 404) {
        next(new NotFoundError(err.message));
      } else if (err.status === 500) {
        next(new errorHandler('Ooopsss Mulder something went wrong...'))
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => updateLikes(req, res, next, '$addToSet');

const dislikeCard = (req, res, next) => updateLikes(req, res, next, '$pull');

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
//com