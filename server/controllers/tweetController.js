const User = require('../models/user');

const createTweet = async (req, res) => {
  if (!req.session.user) {
    return res.status(500).send({
      error: 'You need to login first',
    });
  }
  try {
    const { text, date } = req.body;
    const email = req.session.user.email;
    const user = await User.findOne({ email: email });

    if (!text) {
      return res.status(404).send({
        error: 'please type in something',
      });
    }

    if (user) {
      const newPost = {
        text: text,
        date: date,
      };
      user.posts.push(newPost);
      await user.save();
      return res.status(200).send({
        message: 'post added',
        user: user,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createTweet };
