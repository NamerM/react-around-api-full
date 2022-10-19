
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
require('dotenv').config();
console.log(process.env.NODE_ENV);

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;
const { router } = require('./routes');

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App is available  on port  ${PORT}...`);
});



// not needed
// app.use((req, res, next) => {
//   req.user = {
//     _id: '631f220c1e56c98bfdc2f492',
//   };
//   next();
// });