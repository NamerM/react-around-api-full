const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'An error has occured, server side' }));
};

const createCard = (req, res) => {
  const { name, likes, link } = req.body;

  const owner = req.user._id;

  Card.create({
    name, likes, link, owner,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Bad Request, Invalid data format' });
      } else {
        res.status(500).send({ message: 'Internal Server Error ...' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error('Card not found');
      error.status = 404;

      throw error;
    })
    .then((card) => res.status(200).send({ message: 'Card successfully removed', data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request, Invalid data format' });
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error ...' });
      }
    });
};

const updateLikes = (req, res, operator) => {
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
      } else {
        res.status(500).send({ message: 'Ooopsss Mulder something went wrong...' });
      }
    });
};

const likeCard = (req, res) => updateLikes(req, res, '$addToSet');

const dislikeCard = (req, res) => updateLikes(req, res, '$pull');

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
