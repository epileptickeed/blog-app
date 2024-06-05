const User = require('../models/user');

const getProfile = async (req, res) => {
  if (!req.session.user) {
    return res.json({
      error: 'user is not logged',
    });
  }
  try {
    const email = req.session.user.email;
    const user = await User.findOne({ email: email });

    return res.json(user);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getProfile };
