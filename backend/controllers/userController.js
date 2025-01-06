import createError from "http-errors";
import prisma from "../utils/prisma.js";

async function list(req, res) {
  const users = await prisma.user.findMany({omit: {password: true, email: true}});

  return res.json(users);
}

async function get(req, res, next) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      omit: {password: true, email: true}
    });

    if (!user) {
      return next(createError(404));
    }

    return res.json(user);
  } catch (error) {
    return next(createError(500));
  }
}

async function remove(req, res, next) {
  const { id } = req.params;

  if (req.session.user.id !== id && !req.session.user.isAdmin) {
    return next(createError(403));
  }

  try {
    await prisma.user.delete({
      where: {
        id
      }
    });

    return res.status(204).send();
  } catch (error) {
    return next(createError(500));
  }
}

async function update(req, res, next) {
  const { id } = req.params;
  const { email, name, isAdmin } = req.body;

  if (req.session.user.id !== id && !req.session.user.isAdmin) {
    return next(createError(403));
  }

  try {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        ...req.body
      }
    });

    return res.status(200).json(user);
  } catch (error) {
    return next(createError(500));
  }
}

export { list, get, remove, update };