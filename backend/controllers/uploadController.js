import createError from "http-errors";
import prisma from "../utils/prisma.js";
import {v4} from "uuid";
import { fileURLToPath } from 'url';
import path from 'path';

async function create(req, res, next) {
  if (!req.file) {
    return next(createError(400, "No file uploaded"));
  }

  const uploadUUID = v4();
  const newFilename = `${uploadUUID}.jpeg`;

  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename); // get the name of the directory
  const outputPath = path.join(__dirname, 'uploads', newFilename);

  try {
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    const upload = await prisma.upload.create({
      data: {
        id: fileUUID,
        userId: req.session.user.id,
        type: 0
      }
    });

    return res.status(201).json(upload);
  } catch (error) {
    return next(createError(500));
  }
}

export {create}