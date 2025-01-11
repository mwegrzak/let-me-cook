import express from 'express';
import cors from 'cors';
import session from 'express-session';
import hemlet from 'helmet';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import 'dotenv/config';

import recipeRoute from './routes/recipeRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import adminRoute from './routes/adminRoute.js';
import errorHandler from './middlewares/errorHandler.js';
import prisma from './utils/prisma.js';

const app = express();

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

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true
  }));

  app.use(hemlet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false
  }));
  app.use('/api-doc', express.static('api-doc'));
  app.use('/uploads', express.static('uploads'));
} else {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true
  app.use(hemlet());
}

app.use(session(sess));

app.use('/api/recipe', recipeRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/admin', adminRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  app.emit('appStarted');
});

export default app;