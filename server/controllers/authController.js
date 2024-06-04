const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!name) {
      return res.json({
        error: 'Name is required',
      });
    }
    const nameExists = await User.findOne({ name });
    if (nameExists) {
      return res.json({
        error: 'name is already taken',
      });
    }

    if (!email) {
      return res.json({
        error: 'email is required',
      });
    }
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.json({
        error: 'email is taken',
      });
    }

    if (!password) {
      return res.json({
        email: 'password is required',
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.sessionID);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
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
      return res.json('passwords match');
    } else {
      return res.json('passwords do NOT match');
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerUser, loginUser };
