const isAdmin = (req, res, next) => {
  if (!req.session.user.isAdmin) {
    return next(createError(403));
  }

  next();
}