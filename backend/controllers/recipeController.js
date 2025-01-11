import createError from "http-errors";
import prisma from "../utils/prisma.js";

async function list(req, res) {
  const recipes = await prisma.recipe.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true
        }
      },
      upload: {
        select: {
          id: true,
        }
      },
    }
  });

  res.json(recipes);
}

async function get(req, res, next) {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        },
        upload: {
          select: {
            id: true
          },
        },
        recipeIngredients: {
          select: {
            name: true,
          }
        },
        recipeSteps: {
          select: {
            description: true
          }
        }
      }
    });

    if (!recipe) {
      return next(createError(404));
    }

    res.json(recipe);
  } catch (error) {
    return next(createError(500, error));
  }
}

async function create(req, res, next) {
  let ingredients = [];
  let steps = [];
  let uploadId = null;

  if (req.body.uploadId) {
    const image = await prisma.upload.findUnique({
      where: {
        id: req.body.uploadId
      }
    });

    if (!image) {
      return next(createError(400, 'Image not found'));
    }

    if (image.userId !== req.session.user.id) {
      return next(createError(403));
    }

    uploadId = image.id;
    delete req.body.uploadId;
  }

  if (req.body.ingredients) {
    for (const ingredient of req.body.ingredients) {
      if (!ingredient.name) {
        return next(createError(400, 'Invalid ingredient'));
      }

      ingredients.push({
        name: ingredient.name,
      });
    }
  }

  if (req.body.steps) {
    for (const step of req.body.steps) {
      if (!step.description) {
        return next(createError(400, 'Invalid step'));
      }

      steps.push({
        description: step.description
      });
    }
  }

  if ('ingredients' in req.body) {
    delete req.body.ingredients;
  }
  if ('steps' in req.body) {
    delete req.body.steps;
  }

  try {
    const recipe = await prisma.recipe.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: req.session.user.id
          },
        },
        upload: uploadId
          ? {
              connect: {
                id: uploadId,
              },
            }
          : undefined,
        recipeIngredients: {
          create: ingredients
        },
        recipeSteps: {
          create: steps
        }
      }
    });

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
      },
      recipeIngredients: {
        deleteMany: {}
      },
      recipeSteps: {
        deleteMany: {}
      },
    });

    res.status(204).end();
  } catch (error) {
    return next(createError(500, error));
  }
}

async function update(req, res, next) {
  const { id } = req.params;
  let ingredients = [];
  let steps = [];

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

    if (req.body.uploadId) {
      const image = await prisma.upload.findUnique({
        where: {
          id: req.body.uploadId
        }
      });

      if (!image) {
        return next(createError(404, 'Image not found'));
      }

      if (image.userId !== req.session.user.id) {
        return next(createError(403));
      }
    }

    if (req.body.ingredients) {
      for (const ingredient of req.body.ingredients) {
        if (!ingredient.name) {
          return next(createError(400, 'Invalid ingredient'));
        }

        ingredients.push({
          name: ingredient.name,
          quantity: ingredient.quantity
        });
      }
    }

    if (req.body.steps) {
      for (const step of req.body.steps) {
        if (!step.description) {
          return next(createError(400, 'Invalid step'));
        }

        steps.push({
          description: step.description
        });
      }
    }

    if ('ingredients' in req.body) {
      delete req.body.ingredients;
    }
    if ('steps' in req.body) {
      delete req.body.steps;
    }

    const updatedRecipe = await prisma.recipe.update({
      where: {
        id
      },
      data: {
        ...req.body
      },
      recipeIngredients: {
        deleteMany: {},
        create: ingredients
      },
      recipeSteps: {
        deleteMany: {},
        create: steps
      }
    });

    res.json(updatedRecipe);
  } catch (error) {
    return next(createError(500, error));
  }
}

export { list, get, create, remove, update };