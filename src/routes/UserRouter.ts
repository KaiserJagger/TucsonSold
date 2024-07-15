/* eslint-disable prefer-const */
import express , { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";
import bodyParser from "body-parser";

//Body parser to read BODY from request
let jsonParser = bodyParser.json()

// JWT Verifier Middleware 
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Router from express
let usersRouter = express.Router();

// http://localhost:3000/api/users?id=....
usersRouter.route('/')
// GET:
.get(verifyToken, async (req: Request, res: Response) =>{
    // Obtain a Query param
    let id: any = req?.query?.id;

    //Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param: ${id}`);
    // Controller Intance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.getUsers(page, limit, id);
    // Send Response
    return res.status(response.status).send(response);
})
// DELETE:
.delete(verifyToken, async (req:Request, res:Response) => {
    // Obtain a Query param
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Intance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.deleteUser(id);
    // Send Response
    return res.status(response.status).send(response);
})
// PUT:
.put(verifyToken, async (req:Request, res:Response) => {
     // Obtain a Query param
     let id: any = req?.query?.id;
     let name : any = req?.query?.name;
     let age : any = req?.query?.age;
     let email : any = req?.query?.email;
     LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`);
    // Controller Intance to execute method
    const controller: UserController = new UserController();

    let user= {
        name: name,
        email: email,
        age: age
     };

     // Obtain Response
     const response: any = await controller.updateUser(id, user);

      // Send Response
      return res.status(response.status).send(response);
})



export default usersRouter;

/**
 *Get document => 200 OK 
 * Creation Documents => 201 OK
 * Deletion of documents => 200 (entity) / 204 (No Return)
 * Update of documents => 200 (entity) / 204 (No return)
 */