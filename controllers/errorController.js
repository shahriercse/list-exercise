const AppError = require('../utils/appError');
/**
 * Three types of error created by mongodb.. these errors are marked as OPERATIONAL ERROR
 * Invalid ID
 * Duplicate key
 * validation error
 */
const handleCastErrDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  // we can find the value with the err.keyValue.name
  //const message = `Duplicate Field value: '${err.keyValue.name}'. Please use another value.`;
  // or, we can use regular expression like this
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate Field value: '${value}'. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data: ${errors.join('.\n')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token! Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again', 401);

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  return res.status(err.statusCode).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

const sendErrorProd = (err, req, res) => {
  // FOR API
  if (req.originalUrl.startsWith('/api')) {
    // OPERATIONAL ERROR , TRUSTED ERROR: SEND THIS ERROR TO THE CLIENT
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // PROGRAMMING OR UNKNOWN ERROR: DON'T WANT TO LEAK THE ERROR DETAILS
    }
    // log this error

    // send a gerneric or human friendly message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // FOR RENDERED WEBSITE
  // OPERATIONAL ERROR , TRUSTED ERROR: SEND THIS ERROR TO THE CLIENT
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  // log this error

  // PROGRAMMING OR UNKNOWN ERROR: DON'T WANT TO LEAK THE ERROR DETAILS
  // send a gerneric or human friendly message
  return res.status(err.statusCode).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

// GLOBAL ERROR HANDLER
module.exports = (err, req, res, next) => {
  //console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (error.name === 'CastError') error = handleCastErrDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};

/**
 * we could define different error saverity level like --
 * this error is not very important or this error is medium or
 * this error is very important or critical
 * Also we can send email to administration (admin) this error
 */
