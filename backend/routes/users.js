const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  getUserById,
  updateAvatar,
  updateUser,
} = require('../controllers/users');
const {
  validateProfile,
  validateAvatar,
  validateObjectID,
} = require('../middleware/validators');


router.get('/users', getAllUsers);
router.get('/users/me', getUser);
router.get('/users/:id', validateObjectID, getUserById);
router.patch('/users/me', validateProfile, updateUser);
router.patch('/users/me/avatar', validateAvatar ,updateAvatar);

module.exports = {
  userRouter: router,
};
