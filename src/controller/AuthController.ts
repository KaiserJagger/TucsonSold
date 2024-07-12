import {Delete, Get, Post, Put, Query, Route, Tags} from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interfaces';
import { IAuth } from '../domain/interfaces/IAuth.interfaces';

//ORM
import { loginUser, registerUser, logoutUser, getUserByID, getAllUsers } from '../domain/orm/User.orm'
import { AuthResponse, ErrorResponse } from './types';


@Route("/api/auth")
@Tags("AuthController")

export class AuthController implements IAuthController {

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
    
        let response: any = ''; 

        if (user) {
            LogSuccess(`[/api/auth/register] Register new user: ${user.email}`)
             await registerUser(user).then((r) => {
                LogSuccess(`[/api/users] Created user: ${user.email}`)
                response = {
                    status: 201,
                    message: `User create: ${user.name}`
                }
            }); 
        }  else {
            LogWarning('[/api/auth/register] Register needs User Entity ')
            response = {
                message: 'User not Registered: Please, provide a user entity to create one '
            }
        }

        return response;
    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {
        
        let response: AuthResponse | ErrorResponse | undefined; 

        if(auth){
            LogSuccess(`[/api/auth/login] Logged in user: ${auth.email}`)
            let data = await loginUser(auth);
            response = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }
        }else {
            LogWarning('[/api/auth/login] Register needs Auth Entity (email & password  ')
            response = {
                error: '[AUTH ERROR]: email & password are needed',
                message: 'Please, provide a email && password to login '
            }
        }
       
        return response;
    }

     /**
     * Endpoint to retreive the Users in the collection "Users" of DB
     * Middleware: Validate JWT 
     * In headers you must add the x-access-token with a valid JWT
     * @param {string} id Id of user to retreive(optional)
     * @returns All user o user found by ID
     */
     @Get("/me")
     public async userData(@Query() id: string): Promise<any> {
 
         let response: any = '';
 
         if (id) {
             LogSuccess(`[/api/users] Get user Data by ID: ${id}`)
             response = await getUserByID(id);
             //Remove the password
             response.password = '';
         } else{
            LogSuccess('[/api/users] Get all users request')
            response = await getAllUsers();
            //TODO remove passwords from response 
         }
 
         return response;
     }

    @Post("/logout")
    public async logoutUser(auth: any): Promise<any> {

        let response: any = ''; 

        //TODO Close session of user
        throw new Error("Method not implemented."); 
    }
}