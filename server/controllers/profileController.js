const User = require('../models/user');
const multer = require('multer');

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

const uploadAvatar = async (req, res) => {
  try {
    if (req.session.user) {
      const currentUserEmail = req.session.user.email;
      const user = await User.findOne({ email: currentUserEmail });
      user.avatar = `http://localhost:8080/uploads/${req.file.originalname}`;
      await user.save();
      console.log(user);
      res.json({
        url: `/uploads/${req.file.originalname}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getProfile, uploadAvatar };
