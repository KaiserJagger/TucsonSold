import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interfaces"

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController {
    // Read all users from database || get user by ID
    getUsers(id?: string): Promise<any> 
     // Delete users by id 
    deleteUser(id?: string): Promise<any> 
    // Update user
    updateUser(id:string, user: any): Promise<any>
}

export interface IAuthController {
    //Regitser users
    registerUser(user: IUser):Promise<any>
    //Login user
    loginUser(auth:any):Promise<any>
}


