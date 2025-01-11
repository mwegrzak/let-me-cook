const errorHandler = (err, req, res, next) => {
  let statusCode;
  let message = [];
  let target = [];

  if (err.type) {
    statusCode = 400;
    if (err.error?.details) {
      for (const error of err.error.details) {
        message.push(error.message);
      }
    }
  } else {
    // P2002 is a Prisma error code for unique constraint violation
    if (err.name && err.code == 'P2002') {
      message.push('Unique constraint violation');
      target.push(err.meta.target);
      statusCode = 400;
    } else {
      statusCode = err.statusCode || 500;
      message.push(err.message);
    }
    
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      error: message,
      target: target,
      stack: err.stack,
      all: err
    });
  }

  if (statusCode === 500) {
    return res.status(statusCode).json({
      error: 'Internal Server Error',
    });
  }

  return res.status(statusCode).json({
    error: message,
    target: target,
  });
  
};

export default errorHandler;