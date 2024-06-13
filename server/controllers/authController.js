const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');

// const defaultImage = require('../../client/public/profile.png');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, defaultAvatar } = req.body;

    if (!name) {
      return res.status(500).send({
        error: 'Name is required',
      });
    }
    const nameExists = await User.findOne({ name });
    if (nameExists) {
      return res.status(500).send({
        error: 'name is already taken',
      });
    }

    if (!email) {
      return res.status(500).send({
        error: 'email is required',
      });
    }
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(500).send({
        error: 'email is taken',
      });
    }

    if (!password) {
      return res.status(500).send({
        error: 'password is required',
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      posts: [],
      liked_posts: [],
      avatar: defaultAvatar,
    });

    await user.save();

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.sessionID);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(500).send({
        error: 'User not found',
      });
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      req.session.authenticated = true;
      req.session.user = {
        email,
        password,
      };
      return res.status(200).send('passwords match');
    }
    if (!match) {
      return res.status(500).send({
        error: 'passwords do not match',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerUser, loginUser };
