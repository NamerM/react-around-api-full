require('dotenv').config({ path: './.env' });
console.log(process.env.NODE_ENV);
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const errorHandler = require('./middleware/errorHandler');
const { logger, errorLogger } = require('./middleware/logger');

const allowedCors = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://mnamer.students.nomoredomainssbs.ru',
  ]
}

const app = express();
const { PORT = 3001 } = process.env;
const { router } = require('./routes');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(allowedCors));
app.options('*', cors());

app.use(logger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is available  on port  ${PORT}...`);
})
//