const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  posts: [
    {
      avatar: String,
      comments: Array,
      date: String,
      email: String,
      id: String,
      likes: {
        type: Number,
        default: 0,
      },
      name: String,
      text: String,
      usersThatLiked: {
        userId: String,
      },
      _id: String,
    },
  ],
  liked_posts: Array,
  usersYouChatWith: Array,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
