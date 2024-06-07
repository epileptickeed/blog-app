const User = require('../models/user');

const submitLike = async (req, res) => {
  if (!req.session.user) {
    return res.status(500).send({
      error: 'log in first to like',
    });
  }
  try {
    const { id, postEmail } = req.body;
    const userEmail = req.session.user.email;
    const user = await User.findOne({ email: userEmail });

    const postUser = await User.findOne({ email: postEmail });

    const likedPostIndex = postUser.posts.findIndex((post) => post.id === id);

    if (likedPostIndex !== -1) {
      postUser.posts[likedPostIndex].likes += 1;
      await postUser.save();

      return res.json(postUser);
    }

    // const likedPost = postUser.posts.filter((post) => post.id === id);

    // console.log(likedPost.map((item) => item.likes + 1));

    // await user.save();
    await postUser.save();

    return res.json(user);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  submitLike,
};
