import express , { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { LogInfo } from "../utils/logger";
import { IUser } from '../domain/interfaces/IUser.interfaces';
import { IAuth } from "../domain/interfaces/IAuth.interfaces";

//BCRYPT for password
import bcrypt from 'bcrypt';

//Middleware 
import { verifyToken } from "../middlewares/verifyToken.middleware";

//Body Parser (Read JSON from Body in request)
import bodyParser from "body-parser";

//Middleware to read JSON in body
let jsonParser = bodyParser.json();

// Router from express
let authRouter = express.Router();

//Register
authRouter.route('/register')
.post (jsonParser, async (req:Request, res:Response) => {

    let {name, email, password, age} = req?.body;
    let hashedPassword = '';

    if(name && email && password && age){
        //Obtain the password in request and cypher
        hashedPassword = bcrypt.hashSync(req.body.password, 8);

        let newUser: IUser = {
            name,
            email,
            password: hashedPassword,
            age
        }

        // Controller Intance to execute method
    const controller: AuthController = new AuthController();

        //Obtain Response
        const response:any = await controller.registerUser(newUser)
        
        // Send Response
      return res.status(200).send(response);

   }else {
    // Send to the client the response which include the JWT to authorize request
    return res.status(400).send({
        message: '[ERROR User data missing]: No user can be registered '
    });
   }

})

//Login
authRouter.route('/login')
.post (jsonParser, async (req:Request, res:Response) => {

    let { email, password } = req?.body;

    if(email && password){
        
        // Controller Intance to execute method
        const controller: AuthController = new AuthController();
        
            let auth: IAuth = {
                email:email,
                password:password
            }

        //Obtain Response
        const response:any = await controller.loginUser(auth);
        
        // Send to the client the response which include the JWT to authorize request
      return res.status(200).send(response);
   }else {
    // Send to the client the response which include the JWT to authorize request
    return res.status(400).send({
        message: '[ERROR User data missing]: No user can be registered '
    });
   }

});

//Router Protected by VERIFIY TOKEN MIDDLEWARE
authRouter.route('/me')
.get(verifyToken, async(req:Request, res: Response) =>{
    //Obtain the id of user to check it's data
    let id: any = req?.query?.id;

    if(id){
        //Controller: Auth Controller
        const controller: AuthController = new AuthController();

        //Obtain response from controller
        let response: any = await controller.userData(id);
        
        //If user is authorised
        return res.status(200).send(response);
    
    }else{
        return res.status(401).send({
            message: 'You are not authorised to perform this action'
        })
    }
})


export default authRouter;