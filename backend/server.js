import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import 'dotenv/config';

import recipeRoute from './routes/recipeRoute.js';
import authRoute from './routes/authRoute.js';
import errorHandler from './middlewares/errorHandler.js';
import prisma from './utils/prisma.js';

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type']

}));

const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: new PrismaSessionStore(
    prisma,
    {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined
    }
  )
}
if (app.get('NODE_ENV') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true
}
app.use(session(sess));

app.use('/api/recipe', recipeRoute);
app.use('/api/auth', authRoute);

if (process.env.NODE_ENV === 'development') {
  app.use('/api-doc', express.static('api-doc'));
}

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;