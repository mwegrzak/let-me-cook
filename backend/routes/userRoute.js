import express from 'express';
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { list, get, remove, update } from '../controllers/userController.js';

const router = express.Router();
const validator = createValidator({passError: true, statusCode: 400});

router.get('/', list);

const recipeGetSchema = Joi.object({
    id: Joi.string().required(),
});
router.get('/:id', validator.params(recipeGetSchema), get);

export default router;