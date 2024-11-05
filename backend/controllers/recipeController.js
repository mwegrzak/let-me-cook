import createError from "http-errors";
import prisma from "../utils/prisma.js";

async function list(req, res) {
  const recipes = await prisma.recipe.findMany();

  res.json(recipes);
}

async function get(req, res, next) {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findById(id);

    if (!recipe) {
      return next(createError(404));
    }

    res.json(recipe);
  } catch (error) {
    return next(createError(500, error));
  }
}

async function create(req, res, next) {
  try {
    const recipe = await prisma.recipe.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: req.session.user.id
          }
      }
    }});

    res.status(201).json(recipe);
  } catch (error) {
    return next(createError(500, error));
  }
}

async function remove(req, res, next) {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id
      }
    });

    if (!recipe) {
      return next(createError(404, 'Recipe not found'));
    }

    if (recipe.userId !== req.session.user.id && !req.session.user.isAdmin) {
      return next(createError(403));
    }

    await prisma.recipe.delete({
      where: {
        id
      }
    });

    res.status(204).end();
  } catch (error) {
    return next(createError(500, error));
  }
}

async function update(req, res, next) {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id
      }
    })

    if (!recipe) {
      return next(createError(404, 'Recipe not found'));
    }

    if (recipe.userId !== req.session.user.id && !req.session.user.isAdmin) {
      return next(createError(403));
    }

    const updatedRecipe = await prisma.recipe.update({
      where: {
        id
      },
      data: {
        ...req.body
      }
    });

    res.json(updatedRecipe);
  } catch (error) {
    return next(createError(500, error));
  }
}

export { list, get, create, remove, update };