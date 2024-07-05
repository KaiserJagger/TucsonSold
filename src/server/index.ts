import express, { Express, Request, Response } from 'express';

// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO HTTPS

import RootRouter from '../routes/index';

const server: Express = express();

// Define SERVER to use /api and execute rootrouter from index.ts in routes
// From this point onover: http://localhost/api/...
server.use('/api', RootRouter);


// Static server
server.use(express.static('public'));

// TODO mongoose conection

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
// http://localhost:3000/ -> http://localhost:3000//api
server.get('/', (req:Request, res:Response) => {
    res.redirect('/api')
});

export default server;