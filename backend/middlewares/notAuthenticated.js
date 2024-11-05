const notAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(createError(403));
  }

  next();
}