/* eslint-disable prefer-const */
import express , { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";

// Router from express
let usersRouter = express.Router();

// http://localhost:3000/api/users?id=....
usersRouter.route('/')
// GET:
.get(async (req: Request, res: Response) =>{
    // Obtain a Query param
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Intance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.getUsers(id);
    // Send Response
    return res.send(response);
})
// DELETE:
.delete(async (req:Request, res:Response) => {
    // Obtain a Query param
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Intance to execute method
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.deleteUser(id);
    // Send Response
    return res.send(response);
})
// POST:
.post(async (req:Request, res:Response) => {

    let name : any = req?.query?.name;
    let age : any = req?.query?.age;
    let email : any = req?.query?.email;

     // Controller Intance to execute method
     const controller: UserController = new UserController();

     let user= {
        name: name || 'default',
        email: email || 'default email',
        age: age || 18
     };
     // Obtain Response
     const response: any = await controller.createUser(user);
     // Send Response
     return res.send(response);
})
// PUT:
.put(async (req:Request, res:Response) => {
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
      return res.send(response);
})

export default usersRouter;