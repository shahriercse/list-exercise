const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const exerciseRouter = require('./routers/exerciseRouter');
const userRouter = require('./routers/userRouter');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // This is for logger
}

app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/exercise', exerciseRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// SHOWING AN ERROR - IF REQUEST FROM UNKNOWN ROUTES
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} to this server!`, 404));
// });

// app.use(globalErrorHandler);

module.exports = app;
