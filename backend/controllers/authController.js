import createError from "http-errors";
import argon2 from "argon2";
import prisma from "../utils/prisma.js";
import crypto from "crypto";

async function register(req, res, next) {
  const { email, password, name } = req.body;
  const hashedPassword = await argon2.hash(password);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    await req.session.regenerate((err) => {
      if (err) {
        return next(createError(500, err));
      }

      req.session.user = { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin };
      return res.status(201).json(req.session.user);
    });

  } catch (error) {
    return next(createError(500, error));
  }


};

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        isAdmin: true
      }
    });

    if (!user) {
      return next(createError(401, "Invalid email or password"));
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      return next(createError(401, "Invalid email or password"));
    }

    await req.session.regenerate((err) => {
      if (err) {
        return next(createError(500, err));
      }

      req.session.user = { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin };
      return res.status(200).json(req.session.user);
    });

  } catch (error) {
    return next(createError(500, error));
  }
};

async function logout(req, res, next) {
  try {
    await req.session.destroy();
    return res.status(200).send();
  } catch (error) {
    return next(createError(500, error));
  }
}

async function passwordResetRequest(req, res, next) {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true
      }
    });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const passwordReset = await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
        validTill: new Date(Date.now() + 1000 * 60 * 60 * 24)
      }
    });


    return res.status(200).json(passwordReset);
  } catch (error) {
    return next(createError(500, error));
  }
}

async function passwordReset(req, res, next) {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        token
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            password: true
          }
        }
      }
    });

    if (!passwordReset) {
      return next(createError(404, "Invalid token"));
    }

    if (passwordReset.validTill < new Date()) {
      return next(createError(400, "Token expired"));
    }

    const hashedPassword = await argon2.hash(password);

    await prisma.user.update({
      where: {
        id: passwordReset.userId
      },
      data: {
        password: hashedPassword
      }
    });

    return res.status(200).send();
  } catch (error) {
    return next(createError(500, error));
  }
}

async function check(req, res, next) {
  return res.status(200).json(req.session.user);
}

export { register, login, logout, passwordResetRequest, passwordReset, check };