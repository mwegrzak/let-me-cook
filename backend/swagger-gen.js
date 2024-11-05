import generateSwagger from '@goodrequest/express-joi-to-swagger';
import path from 'path';
import app from './server.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const config = {
	outputPath: path.join(__dirname, 'dist'),
	generateUI: true,
	swaggerUIPath: '/api-doc',
	requestSchemaName: 'recipeCreateSchema',
	swaggerInitInfo: {
		info: {
			title: 'Let me cook',
		}
	},
	tags: {}
}

// Use case example
function workflow() {
	generateSwagger.default(app, config).then(() => {
		console.log('Apidoc was successfully generated')
	}).catch((e) => {
		console.log(`Unable to generate apidoc: ${e}`)
	})
}

// Start script
workflow()