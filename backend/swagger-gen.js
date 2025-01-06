// swagger-gen.js
import generateSwagger from '@goodrequest/express-joi-to-swagger';
import path from 'path';
import app from './server.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  outputPath: path.join(__dirname, 'api-doc'),
  generateUI: true,
  swaggerUIPath: '/api-doc',
	requestSchemaNames: [
    'registerSchema',
    'loginSchema',
    'passwordResetRequestSchema',
    'passwordResetSchema',
    'recipeCreateSchema',
    'recipeUpdateSchemaBody',
		'recipeDeleteSchema',
		'uploadSchema',
		'userGetSchema',
		'userUpdateSchema',
		'userUpdateSchemaBody',
		'userDeleteSchema',
  ],
  openapi: '3.0.0',
  swaggerInitInfo: {
    info: {
      title: 'Let me cook',
      version: '1.0.0',
      description: 'API Documentation for Let me cook application',
    },
    // Globally indicate what the API consumes/produces
    consumes: ['application/json', 'multipart/form-data'],
    produces: ['application/json'],
  },
  tags: {
    Auth: { name: 'Auth', description: 'Endpoints for authentication' },
    Recipes: { name: 'Recipes', description: 'Endpoints for recipes' },
    Users: { name: 'Users', description: 'Endpoints for users' },
    Uploads: { name: 'Uploads', description: 'Endpoints for file uploads' },
  },
};

async function workflow() {
  try {
    await generateSwagger.default(app, config);
    console.log('Apidoc was successfully generated');
  } catch (e) {
    console.log(`Unable to generate apidoc: ${e}`);
  }
}

workflow();
