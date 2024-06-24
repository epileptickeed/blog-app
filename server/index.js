const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');
const session = require('express-session');
const multer = require('multer');

const app = express();

app.use(
  session({
    secret: 'some secret',
    cookie: { maxAge: 3600000 * 24 * 7 },
    resave: true,
    saveUninitialized: false,
  }),
);

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, __, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.post('/uploadAvatar', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccesStatus: 200,
};

app.use(cors(corsOption));
app.use('/', require('./routes/authRoutes'));

mongoose
  .connect(process.env.DB_URL)
  .then(console.log('DB Connected!'))
  .catch((error) => console.error(error));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
