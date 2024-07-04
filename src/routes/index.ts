// Root Router
// Redirections to Routers

import express,{ Request, Response} from "express";
import helloRouter from "./HelloRouter";
import { LogInfo } from "@/utils/logger";

// Server instace
const app = express()

// Router instance
let rootRouter = express.Router();

// Activate for request to http://localhost:3000/api/
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('Get: http://localhost:3000/api/')
    res.send('Hello world');
});

// Redirection to routers & controllers
app.use('/', rootRouter); //http://localhost:3000/api/
app.use('/hello', helloRouter); //http://localhost:3000/api/hello 

//Add more routes to the app

export default app;

