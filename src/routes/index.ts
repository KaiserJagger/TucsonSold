// Root Router
// Redirections to Routers

import express,{ Request, Response} from "express";
import helloRouter from "./HelloRouter";
import { LogInfo } from "../utils/logger";
import usersRouter  from "./UserRouter";
import authRouter from "./AuthRouter";


// Server instace
const server = express()

// Router instance
let rootRouter = express.Router();

// Activate for request to http://localhost:3000/api/
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('Get: http://localhost:3000/api/')
    res.send('Hello world');
});

// Redirection to routers & controllers
server.use('/', rootRouter); //http://localhost:3000/api/
server.use('/hello', helloRouter); //http://localhost:3000/api/hello --> HelloRouter
// Add more routes to the app
server.use('/users', usersRouter); //http://localhost:3000/api/users --> UsersRouter
//Auth routes
server.use('/auth', authRouter); //http://localhost:3000/api/auth --> AuthRouter
//Add more routes to the server

export default server;

