import express from 'express';
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { list, get, create, remove, update } from '../controllers/recipeController.js';

const router = express.Router();
const validator = createValidator({passError: true, statusCode: 400});

router.get('/', list);

const recipeGetSchema = Joi.object({
    id: Joi.string().required(),
});
router.get('/:id', validator.params(recipeGetSchema), get);

const recipeCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.string().required(),
    steps: Joi.string().required(),
    difficulty: Joi.number().required(),
    time: Joi.number().required(),
});
router.post('/', validator.body(recipeCreateSchema), create);

const recipeUpdateSchemaBody = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.string().required(),
    steps: Joi.string().required(),
    difficulty: Joi.number().required(),
    time: Joi.number(),
});
const recipeUpdateSchemaParams = Joi.object({
    id: Joi.string().required(),
});
router.put('/:id', validator.params(recipeUpdateSchemaParams), validator.body(recipeUpdateSchemaBody), update);

const recipeDeleteSchema = Joi.object({
    id: Joi.string().required(),
});
router.delete('/:id', validator.params(recipeDeleteSchema), remove);

export default router;