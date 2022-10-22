const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'An error has occured, server side' }));
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
        res.status(400).send({ message: 'Bad Request, Invalid data format' });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'Internal Server Error ...' });
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      const error = new Error('Card not found');
      error.status = 404;
      throw error;
    })
    .then((card) => {
      if(!card.owner.equals(req.user._id)) {
        res.status(401).send({ message: 'This is not your card to delete!'});
      } else {
        Card.findByIdAndRemove(cardId)
          .then((card) => res.send(card))
      }
    })
    // .then((card) => res.status(200).send({ message: 'Card successfully removed', data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request, Invalid data format' });
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'Internal Server Error ...' });
      } else {
        next(err);
      }
    });
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
      const error = new Error('Card Id is not found');
      error.status = 404;

      throw error;
    })
    .then((CARD) => res.send({ data: CARD }))
    .catch((err) => {
      if (err.name === 'Cast Error') {
        res.status(400).send({ message: 'Card Id is not correct' });
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'Ooopsss Mulder something went wrong...' });
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
