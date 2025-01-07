import express from 'express';
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { list, get, remove, update, listRecipes } from '../controllers/userController.js';
import authenticated from "../middlewares/authenticated.js";

const router = express.Router();
const validator = createValidator({passError: true, statusCode: 400});

router.get('/', list);

const userGetSchema = Joi.object({
    id: Joi.string().required(),
});
router.get('/:id', validator.params(userGetSchema), get);

const userUpdateSchema = Joi.object({
    id: Joi.string().required(),
});
const userUpdateSchemaBody = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
});
router.put('/:id', validator.params(userUpdateSchema), validator.body(userUpdateSchemaBody), authenticated, update);

const userDeleteSchema = Joi.object({
    id: Joi.string().required(),
});
router.delete('/:id', validator.params(userDeleteSchema), update, remove);

const userRecipeSchema = Joi.object({
    id: Joi.string().required(),
});
router.get('/:id/recipe', validator.params(userRecipeSchema), listRecipes);

export default router;