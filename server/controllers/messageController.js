const User = require('../models/user');

const findUser = async (req, res) => {
  if (req.session.user) {
    try {
      const users = await User.find();
      console.log(users);
      return res.status(200).send(users);
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = { findUser };
