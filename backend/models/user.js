const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const validator = require('validator');
const { LINK_REGEXP, EMAIL_REGEXP } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    required: [true, 'About field must be filled in'],
    minlength: [2, 'Minimum length of the name should be 2'],
    maxlength: [30, 'Maximum lengt of the name should be 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    required: true,
    validate: {
      validator: (v) => LINK_REGEXP.test(v),
      message: 'Enter a Valid Avatar address',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => EMAIL_REGEXP.test(v),
      message: 'Enter a Valid E-Mail Address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
};

userSchema.methods.toJSON = function () {
  const { password, ...obj } = this.toObject();
  return obj;
};

module.exports = mongoose.model('user', userSchema);
//
