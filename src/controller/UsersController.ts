import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

//ORM
import { deleteUserByID, getAllUsers, getKatasFromUser, getUserByID, updateUserByID } from '../domain/orm/User.orm'


@Route("/api/users")
@Tags("UserController")


export class UserController implements IUserController {
    /**
     * Endpoint to retreive the Users in the collection "Users" of DB
     * @param {string} id Id og user to retrieve (optional)
     * @returns All user o user found by id
    */
    @Get("/")
    public async getUsers(@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {

        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Get users by ID: ${id}`)
            response = await getUserByID(id);
        } else {
            LogSuccess('[/api/users] Get all Users request')
            response = await getAllUsers(page, limit);
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
                response = {
                status: 204,
                message: `User with id ${id} deleted successfully`
                }
            });
        } else {
            LogWarning('[/api/users] Delete User request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }

        return response;
    }


    @Put("/")
    public async updateUser(@Query()id:string ,user: any): Promise<any> {
      
        let response: any = '';
        
        if (id) {
            LogSuccess(`[/api/users] Update users by ID: ${id}`)
            await updateUserByID(id, user).then((r) => {
                response = {
                message: `User with id ${id} updated successfully`,
                status:204
                }
            });
        } else {
            LogWarning('[/api/users] Update User request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to update an existing user',
                status: 400
            }
        }

        return response;
    }

    @Get('/katas') 
    public async getKatas(@Query()page: number, @Query()limit: number, @Query()id: string): Promise<any> {
        let response: any = '';
        
        if (id) {
            LogSuccess(`[/api/users/katas] Get katas from users by ID: ${id}`)
            response = await getKatasFromUser(page,limit,id);
        } else {
            LogSuccess('[/api/users/katas] Get all Katas without id')
            response = {
                message: 'ID from user is needed'
            }
        }

        
       

      

        return response;
    }

}
