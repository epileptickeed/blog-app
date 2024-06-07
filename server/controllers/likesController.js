const User = require('../models/user');

const submitLike = async (req, res) => {
  try {
    const { id, postEmail } = req.body;
    const userEmail = req.session.user.email;

    const postUser = await User.findOne({ email: postEmail });
    const likedPostIndex = postUser.posts.findIndex((post) => post.id === id);

    if (likedPostIndex !== -1) {
      postUser.posts[likedPostIndex].likes += 1;
      postUser.liked_posts.push(id); // Add the liked post ID to the liked_posts array
      const userThatLiked = postUser.posts.usersThatLiked;
      // if (postUser) return false;
      console.log(userThatLiked);
      await postUser.save(); // Save the updated user document
      return res.json(postUser);
    } else {
      return res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  submitLike,
};
