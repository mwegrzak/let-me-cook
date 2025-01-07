import express from 'express';
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { list, get, create, remove, update } from '../controllers/recipeController.js';
import authenticated from "../middlewares/authenticated.js";

const router = express.Router();
const validator = createValidator({passError: true, statusCode: 400});

router.use(express.json());

router.get('/', list);

const recipeGetSchema = Joi.object({
    id: Joi.string().required(),
});
router.get('/:id', validator.params(recipeGetSchema), get);

const recipeCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    difficulty: Joi.number().required(),
    time: Joi.number().required(),
    uploadId: Joi.string().optional(),
    ingredients: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        quantity: Joi.string().required(),
    })).optional(),
    steps: Joi.array().items(Joi.object({
        description: Joi.string().required(),
    })).optional(),
});
router.post('/', validator.body(recipeCreateSchema), authenticated, create);

const recipeUpdateSchemaBody = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    difficulty: Joi.number().optional(),
    time: Joi.number().optional(),
    uploadId: Joi.string().optional(),
    ingredients: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        quantity: Joi.string().required(),
    })).optional(),
    steps: Joi.array().items(Joi.object({
        description: Joi.string().required(),
    })).optional(),
});
const recipeUpdateSchemaParams = Joi.object({
    id: Joi.string().required(),
});
router.put('/:id', validator.params(recipeUpdateSchemaParams), validator.body(recipeUpdateSchemaBody), authenticated ,update);

const recipeDeleteSchema = Joi.object({
    id: Joi.string().required(),
});
router.delete('/:id', validator.params(recipeDeleteSchema), authenticated, remove);

export default router;