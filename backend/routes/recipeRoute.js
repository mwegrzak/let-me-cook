import express from 'express';
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeController.js';

const router = express.Router();
const validator = createValidator({passError: true, statusCode: 400});

router.get('/', getRecipes);

const recipeGetSchema = Joi.object({
    id: Joi.number().required(),
});
router.get('/:id', validator.params(recipeGetSchema), getRecipeById);

const recipeCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.string().required(),
    steps: Joi.string().required(),
    difficulty: Joi.number().required(),
    time: Joi.number().required(),
});
router.post('/', validator.body(recipeCreateSchema), createRecipe);

const recipeUpdateSchemaBody = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    ingredients: Joi.string(),
    steps: Joi.string(),
    difficulty: Joi.number(),
    time: Joi.number(),
});
const recipeUpdateSchemaParams = Joi.object({
    id: Joi.number().required(),
});
router.put('/:id', validator.params(recipeUpdateSchemaParams), validator.body(recipeUpdateSchemaBody), updateRecipe);

const recipeDeleteSchema = Joi.object({
    id: Joi.number().required(),
});
router.delete('/:id', validator.params(recipeDeleteSchema), deleteRecipe);

export default router;