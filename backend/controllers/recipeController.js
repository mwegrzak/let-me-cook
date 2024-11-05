import createError from "http-errors";
import prisma from "../utils/prisma.js";

async function list(req, res) {
  const recipes = await prisma.recipe.find();

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
    const recipe = await prisma.recipe.create(req.body);

    res.status(201).json(recipe);
  } catch (error) {
    return next(createError(500, error));
  }
}

async function remove(req, res, next) {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findByIdAndDelete(id);

    if (!recipe) {
      return next(createError(404, 'Recipe not found'));
    }

    if (recipe.userId !== req.session.user.id && !req.session.user.isAdmin) {
      return next(createError(403));
    }

    recipe.remove();

    res.status(204).end();
  } catch (error) {
    return next(createError(500, error));
  }
}

async function update(req, res, next) {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findById(id);

    if (!recipe) {
      return next(createError(404, 'Recipe not found'));
    }

    if (recipe.userId !== req.session.user.id && !req.session.user.isAdmin) {
      return next(createError(403));
    }

    Object.assign(recipe, req.body);

    await recipe.save();

    res.json(recipe);
  } catch (error) {
    return next(createError(500, error));
  }
}

export { list, get, create, remove, update };