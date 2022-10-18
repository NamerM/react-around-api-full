const mongoose = require('mongoose');

const { LINK_REGEXP, EMAIL_REGEXP, PASS_REGEXP } = require('../constants/index');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    required:[ true, 'Name field can not be empty'],
    minlength: [2, 'Minimum length of the name should be 2'],
    maxlength: [30, 'Maximum lengt of the name should be 30'],
  },
  about: {
    type: String,
    default: "Explorer",
    required: [true, 'About field must be filled in'],
    minlength: [2, 'Minimum length of the name should be 2'],
    maxlength: [30, 'Maximum lengt of the name should be 30'],
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    required: [true, 'Please enter valid image address to the field'],
    validate: {
      validator(v) {
        return LINK_REGEXP.test(v);
      },
      message: 'Enter a Valid Avatar address',
    },
  },
  email:  {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {  // => validator.isEmail(v), curly brackets of
        return EMAIL_REGEXP.test(v);
      },
      message: 'Enter a Valid E-Mail Address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6,'The Minimum length of password is 6'],
    maxlength: [10, 'maximum length of the password not exceed 10 characters'],
    select: false,
    validate: {
      validator(v) {
        return PASS_REGEXP.text(v);
      },
      message: 'Enter a Valid password',
    },
   },  // { versionKey: false }

});

module.exports = mongoose.model('user', userSchema);
