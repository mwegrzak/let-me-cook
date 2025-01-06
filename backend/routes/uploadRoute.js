import express from 'express';
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { create } from '../controllers/uploadController.js';
import authenticated from "../middlewares/authenticated.js";
import multer from 'multer';

const router = express.Router();
const validator = createValidator({passError: true, statusCode: 400});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  }
});
const uploadSchema = Joi.object({
  file: Joi.object().required(),
});
router.post('/upload', upload.single('file'), authenticated, create);

export default router;