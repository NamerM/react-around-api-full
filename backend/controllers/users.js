const User = require('../models/user');
const bcrypt = require('bcrypt');
const { NODE_ENV, JWT_SECRET } = process.env;


const castError = (req, res, err) => {
  if (err.name === 'CastError') {
    res.status(400).send('Invalid Id Format');
  } else if (err.status === 404) {
    res.status(404).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Internal Server Error ...' });
  }
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'An error has occured, server side' }));
};

const getUser = (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .orFail(() => {
      const error = new Error('User id is not found');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      castError(req, res, err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign(
      { _id: user._id},
      NODE_ENV === 'production' ? JWT_SECRET : 'Secret of Narnia',  //in build part just JWT_SECRET
      { expiresIn: '7d'}
      );
    res.send({ data: user.toJSON(), token })    // res.status(200).send(token);
  })
  .catch(() => {
    res.status(401).send({ message: 'Incorrect email or password, please check and try again'});  //new UnauthorizedError //next(new Error('Login information is incorrect, check either email or password'));
    next();
  })
}


const createUser = (req, res, next) => {
  const { name, avatar, about, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if(user) {
        throw new Error('Current Email has already been registered');  // throw new ErrorRepetitionMail
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>  User.create({
      name, avatar, about, email, password: hash,
    }))
    .then((users) => res.status(201).send({ data: users })) // send({ users })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Bad Request' });//next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);//res.status(500).send({ message: 'Internal Server Error ...' });
      }
    });

};



const updateUserData = (req, res) => {
  const { body } = req;
  const id = req.user._id;

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('User Id is not found');
      error.status = 404;

      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      castError(req, res, err);
    });
};

const updateAvatar = (req, res) => {
  const avatar = req.body;

  if (!avatar) {
    return res.status(400).send({ message: 'Avatar should have inputs! - Can\'t leave avatar empty!' });
  }
  return updateUserData(req, res);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: ' Can\'t leave the field empty!' });
  }
  return updateUserData(req, res);
};

module.exports = {
  getAllUsers,
  getUser,
  login,
  createUser,
  updateAvatar,
  updateUser,
};
