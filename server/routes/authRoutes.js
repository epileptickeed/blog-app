const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser } = require('../controllers/authController');
const {
  createTweet,
  deleteTweet,
  editTweet,
  submitLike,
} = require('../controllers/tweetController');
const { getProfile, uploadAvatar } = require('../controllers/profileController');
const { getAllTweets } = require('../controllers/allTweetsController');
const { findUser, addUsersToYourMessages } = require('../controllers/messageController');
const multer = require('multer');

router.use(
  cors({
    credentials: true,
    origin: `http://localhost:5173`,
  }),
);
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/tweet', createTweet);
router.get('/getProfile', getProfile);
router.get('/getAllTweets', getAllTweets);
router.post('/submitLike', submitLike);
router.post('/deleteTweet', deleteTweet);
router.put('/editTweet/:id', editTweet);
router.get('/findUser', findUser);
router.post('/addUsersToYourMessages', addUsersToYourMessages);

router.post('/uploadAvatar', upload.single('image'), uploadAvatar);

module.exports = router;
