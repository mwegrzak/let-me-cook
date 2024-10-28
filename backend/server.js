import express, { request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { Receipe } from './models/receipeModel.js';
import receipeRoute from './routes/receipeRoute.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']

}));

// route root
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Hello');

});
app.use('/receipe', receipeRoute);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        console.log('App connected to DB');
        app.listen(process.env.APP_PORT, () => {
            console.log(`Server started at http://localhost:${process.env.APP_PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);

    });
