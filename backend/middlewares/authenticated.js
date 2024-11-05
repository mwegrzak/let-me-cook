import createError from "http-errors";

const authenticated = (req, res, next) => {
  if (!req.session.user) {
    return next(createError(401));
  }

  next();
}

export default authenticated;