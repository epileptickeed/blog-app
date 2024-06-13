const mongoose = require('mongoose');
const { Schema } = mongoose;

const postsSchema = new Schema({
  text: String,
  id: String,
  userAvatar: String,
  userName: String,
  userEmail: String,
  date: String,
  likes: {
    type: Number,
    default: 0,
  },
  usersThatLiked: Array,
});

const userModel = mongoose.model('Posts', postsSchema);
module.exports = userModel;
