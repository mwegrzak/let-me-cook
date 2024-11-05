import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";

import { register, login, logout, passwordResetRequest, passwordReset, check } from "../controllers/authController.js";
import authenticated from "../middlewares/authenticated.js";
import notAuthenticated from "../middlewares/notAuthenticated.js";

const validator = createValidator({passError: true, statusCode: 400});
const router = Router();

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
});
router.post('/register', notAuthenticated ,validator.body(registerSchema), register);

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
router.post('/login', notAuthenticated ,validator.body(loginSchema), login);

router.post('/logout', logout);

const passwordResetRequestSchema = Joi.object({
    email: Joi.string().email().required(),
});
router.post('/passwordreset', notAuthenticated ,validator.body(passwordResetRequestSchema), passwordReset);

const passwordResetSchema = Joi.object({
    password: Joi.string().min(8).required(),
});
router.post('/passwordreset/:token', notAuthenticated ,validator.body(passwordResetSchema), passwordReset);


router.get('check', authenticated, check)

export default router;