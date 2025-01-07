import createError from "http-errors";
import prisma from "../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

async function create(req, res, next) {
  if (!req.file) {
    return next(createError(400, "No file uploaded"));
  }

  const uploadUUID = uuidv4();
  const newFilename = `${uploadUUID}.jpeg`;

  const __filename = fileURLToPath(import.meta.url); // Get the resolved path to the current file
  const __dirname = path.dirname(__filename); // Get the name of the current directory
  const rootDir = path.join(__dirname, '..'); // Navigate to the upper directory
  const uploadDir = path.join(rootDir, 'uploads'); // Define uploads directory in the upper directory
  const outputPath = path.join(uploadDir, newFilename);

  try {
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process and save the uploaded file using sharp
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // Save the upload metadata to the database
    const upload = await prisma.upload.create({
      data: {
        id: uploadUUID,
        userId: req.session.user.id,
        type: 0,
      },
    });

    return res.status(201).json(upload);
  } catch (error) {
    console.error("Error processing upload:", error.message);
    return next(createError(500, "Internal Server Error"));
  }
}

export { create };
