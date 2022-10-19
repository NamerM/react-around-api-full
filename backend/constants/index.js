// const mongoose = require('mongoose');
const LINK_REGEXP = /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/gi;
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&‘*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const PASS_REGEXP =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

module.exports = {
  LINK_REGEXP,
  EMAIL_REGEXP,
  PASS_REGEXP,
};
