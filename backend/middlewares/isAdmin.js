import createError from "http-errors";

const isAdmin = (req, res, next) => {
  if (!req.session.user.isAdmin) {
    return next(createError(403));
  }

  next();
}

export default isAdmin;