import express from 'express';
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { list, get, remove, update } from '../controllers/adminController.js';
import authenticated from "../middlewares/authenticated.js";
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();
const validator = createValidator({passError: true, statusCode: 400});

router.use(express.json());
router.use(authenticated);
router.use(isAdmin);

router.get('/user', list);

const userGetSchema = Joi.object({
    id: Joi.string().required(),
});
router.get('/user/:id', validator.params(userGetSchema), get);

const userUpdateSchema = Joi.object({
    id: Joi.string().required(),
});
const userUpdateSchemaBody = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    isAdmin: Joi.boolean().optional(),
});
router.put('/user/:id', validator.params(userUpdateSchema), validator.body(userUpdateSchemaBody), update);

const userDeleteSchema = Joi.object({
    id: Joi.string().required(),
});
router.delete('/user/:id', validator.params(userDeleteSchema), update, remove);

export default router;