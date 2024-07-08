import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IUserControlle } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

//ORM
import { deleteUserByID, getAllUsers, getUserByID, createUser, updateUserByID } from '../domain/orm/User.orm'
import { query } from 'express';

@Route("/api/users")
@Tags("UserController")


export class UserController implements IUserControlle {
    /**
     * Endpoint to retreive the Users in the collection "Users" of DB
    */
    @Get("/")
    public async getUsers(@Query() id?: string): Promise<any> {

        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Get users by ID: ${id}`)
            response = await getUserByID(id);
        } else {
            LogSuccess('[/api/users] Get all Users request')
            response = await getAllUsers();
        }

        return response;
    }
    /**
     * Endpoint to delete the users in the collection "Users" of DB
     * @param {string} id Id of user to retreive (optional)
     * @returns Message informing if deletion was correct
    */
    @Delete("/")
    public async deleteUser(@Query() id?: string): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Delete users by ID: ${id}`)
            await deleteUserByID(id).then((r) => {
                message: `User with id ${id} deleted successfully`
            });
        } else {
            LogWarning('[/api/users] Delete User request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }

        return response;
    }

 
@Post("/")
    public async createUser(user: any): Promise<any> {
      
        let response: any = '';
        
        await createUser(user).then((r) =>{
            LogSuccess(`[/api/users] Create user: ${user}`)
            response = {
                message: `User create: ${user.name}`
            }
        })
        return response;
    }

    @Put("/")
    public async updateUser(@Query()id:string ,user: any): Promise<any> {
      
        let response: any = '';
        
        if (id) {
            LogSuccess(`[/api/users] Update users by ID: ${id}`)
            await updateUserByID(id, user).then((r) => {
                message: `User with id ${id} updated successfully`
            });
        } else {
            LogWarning('[/api/users] Update User request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to update an existing user'
            }
        }

        return response;
    }

}
