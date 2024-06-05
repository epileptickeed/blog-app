const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser } = require('../controllers/authController');
const { createTweet } = require('../controllers/tweetController');
const { getProfile } = require('../controllers/profileController');
const { getAllTweets } = require('../controllers/allTweetsController');

router.use(
  cors({
    credentials: true,
    origin: `http://localhost:5173`,
  }),
);

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/tweet', createTweet);
router.get('/getProfile', getProfile);
router.get('/getAllTweets', getAllTweets);

module.exports = router;
