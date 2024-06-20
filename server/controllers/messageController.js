const User = require('../models/user');

const findUser = async (req, res) => {
  if (req.session.user) {
    try {
      const users = await User.find();
      // console.log(users);
      return res.status(200).send(users);
    } catch (error) {
      console.error(error);
    }
  }
};

const addUsersToYourMessages = async (req, res) => {
  const { user } = req.body;
  // if (req.session.user) {
  try {
    const currentSessionUser = req.session.user;
    const currentUser = await User.findOne({ email: currentSessionUser?.email });

    console.log(user?._id);
    const existingUser = currentUser?.usersYouChatWith.map((item) => item._id);

    if (!existingUser?.includes(user?._id)) {
      currentUser?.usersYouChatWith.push(user);
      await currentUser.save();
    } else {
      return res.status(500).send({
        error: 'You already have this user added',
      });
    }
    return res.status(200).send(currentUser.usersYouChatWith);
  } catch (error) {
    console.error(error);
  }
};

const getUsersInYourMessaages = async (req, res) => {};

module.exports = { findUser, addUsersToYourMessages };
