const errorHandler = (err, req, res, next) => {
  let statusCode;
  let message = [];

  if (err.type) {
    statusCode = 400;
    for (const error of err.error.details) {
      message.push(error.message);
    }
  } else {
    statusCode = err.statusCode || 500;
    message.push(err.message);
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      error: message,
      stack: err.stack,
      all: err
    });
  }

  if (statusCode === 500) {
    return res.status(statusCode).json({
      error: 'Internal Server Error'
    });
  }

  return res.status(statusCode).json({
    error: message,
  });
  
};

export default errorHandler;