const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateCardBody,
  validateObjectId,
} = require('../middleware/validators');

router.get('/cards', getAllCards);
router.delete('/cards/:cardId', validateObjectId, deleteCard);
router.post('/cards', validateCardBody, createCard);
router.put('/cards/:cardId/likes', validateObjectId, likeCard);
router.delete('/cards/:cardId/likes', validateObjectId, dislikeCard);

module.exports = {
  cardRouter: router,
};
