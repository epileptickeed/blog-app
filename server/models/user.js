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
  posts: [
    {
      id: String,
      content: String,
      likes: {
        type: Number,
        default: 0,
      },
      usersThatLiked: Array,
    },
  ],
  liked_posts: Array,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
