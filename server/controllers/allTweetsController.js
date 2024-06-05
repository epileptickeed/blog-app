const User = require('../models/user');

const getAllTweets = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users

    // Use the aggregation framework to get random posts from each user
    const randomPosts = await User.aggregate([
      { $match: { _id: { $in: users.map((user) => user._id) } } }, // Match users based on their _id
      { $project: { randomPost: { $arrayElemAt: ['$posts', { $floor: { $rand: {} } }] } } }, // Get a random post from each user's posts array
    ]);

    res.json(randomPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllTweets };
