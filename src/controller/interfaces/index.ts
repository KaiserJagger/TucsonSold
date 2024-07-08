import { BasicResponse } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserControlle {
    // Read all users from database || get user by ID
    getUsers(id?: string): Promise<any> 
     // Delete users by id 
    deleteUser(id?: string): Promise<any> 
    // Create new user
    createUser(user: any): Promise<any>
    // Update user
    updateUser(id:string, user: any): Promise<any>
}


