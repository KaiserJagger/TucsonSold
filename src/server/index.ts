import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Security
import cors from 'cors';
import helmet from 'helmet';

//Routes
import RootRouter from '../routes/index';

//Configure dotenv
dotenv.config();

const server: Express = express();

// Define SERVER to use /api and execute rootrouter from index.ts in routes
// From this point onover: http://localhost/api/...
server.use('/api', RootRouter);

//Declared DATABASE
//const db = process.env.MONGO_URL;

// Static server
server.use(express.static('public'));

mongoose.connect('mongodb+srv://kaiserjager10:0cinco0uno@cluster0.4xe3vat.mongodb.net/Tucsold')

// Security config
server.use(helmet());
server.use(cors());

// Content type confi:
server.use(express.urlencoded({
    extended: true,
    limit:'50mb'
}));

server.use(express.json({limit:'50mb'}));

// Redirections Config
// http://localhost:3000/ -> http://localhost:3000/api
server.get('/', (req:Request, res:Response) => {
    res.redirect('/api')
});

export default server;