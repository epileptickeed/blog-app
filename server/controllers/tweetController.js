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
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        id: crypto.randomUUID(),
        likes: 0,
        comments: [],
      };
      user.posts.push(newPost);
      await user.save();
      return res.status(200).send({
        message: `post added for ${user.name}, input: ${text}`,
        user: user,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteTweet = async (req, res) => {
  if (!req.session.user) {
    return res.status(500).send({
      error: 'Login please',
    });
  }
  try {
    const { id, postUserEmail } = req.body;
    const currentUserEmail = req.session.user.email;

    if (currentUserEmail != postUserEmail) {
      return res.status(500).send({
        error: `Cannot delete posts if you are not the one who created it`,
      });
    }

    const currentUser = await User.findOne({ email: postUserEmail });
    currentUser.posts = currentUser.posts.filter((post) => post.id !== id);

    await currentUser.save();
    return res.status(200).send({
      message: 'deleted',
    });
  } catch (error) {
    console.error(error);
  }
};

const editTweet = async (req, res) => {
  const { id } = req.params;
  const { email, text } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const post = user.posts.find((post) => post.id === id);
    if (text) {
      post.text = text;
    } else {
      return res.status(500).send({
        error: 'Cannot be empty',
      });
    }
    await user.save();
    return res.status(200).send({
      message: 'edited',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 'Something went wrong',
    });
  }
};

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
      console.log(postUser.posts);
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

module.exports = { createTweet, deleteTweet, editTweet, submitLike };
