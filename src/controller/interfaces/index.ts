import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interfaces"
import { IKata } from "../../domain/interfaces/IKata.interface";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController {
    // Read all users from database || get user by ID
    getUsers(page: number, limit:number, id?: string): Promise<any> 
    //Get katas of user
    getKatas(page: number, limit:number, id?: string):Promise<any>
    
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


export interface IKataController{
     // Read all katas from database || get kata by ID
     getKatas(page: number, limit:number, id?: string): Promise<any> 
    //Get all katas of user

     //Create kata
     createKata(kata : IKata): Promise<any>
     // Delete katas by id 
    deleteKata(id?: string): Promise<any> 
    // Update kata
    updateKata(id:string, kata: IKata): Promise<any>    
}