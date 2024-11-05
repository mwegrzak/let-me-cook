import createError from "http-errors";

const notAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(createError(403, 'Already authenticated'));
  }

  next();
}

export default notAuthenticated;