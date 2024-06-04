const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt((err, salt) => {
      if (err) {
        rej(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          rej(err);
        }
        res(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

module.exports = { hashPassword, comparePassword };
