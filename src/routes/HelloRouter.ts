/* eslint-disable prefer-const */
import express , { Request, Response } from "express";
import { HelloController } from "../controller/HelloController";
import { LogInfo } from "../utils/logger";

// Router from express
let helloRouter = express.Router();

// http://localhost:3000/api/hello?name=Nicolas/
helloRouter.route('/')
// GET:
.get(async (req: Request, res: Response) =>{
    // Obtain a Query param
    let name: any = req?.query?.name;
    LogInfo(`Query Param: ${name}`);
    // Controller Intance to execute method
    const controller: HelloController = new HelloController();
    // Obtain Response
    const response = await controller.getMessage(name);
    // Send Response
    return res.send(response);
})

export default helloRouter;


