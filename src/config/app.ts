import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { dbConnect } from './db/db.config';
import userRoutes  from './../modules/users/user.routes'

dotenv.config();
const app = express();
dbConnect();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };
  app.use(helmet());
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

//   app.use(
  app.use(userRoutes);


export default app;