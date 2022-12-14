const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getAllCards = (req, res, next) => {
  Card.find({})

    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner, // likes removed
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
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
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('This is not your card to delete!'));
      } else {
        Card.findByIdAndRemove(cardId)
          .then((deletecard) => res.send(deletecard));
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
    .catch(next);
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
