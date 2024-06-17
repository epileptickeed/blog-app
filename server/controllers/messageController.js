const User = require('../models/user');

const findUser = async (req, res) => {
  const { text } = req.body;
  console.log(text);
};

module.exports = { findUser };
