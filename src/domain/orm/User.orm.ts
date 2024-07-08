import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from '../../utils/logger';

// CRUD

/**
 * Method to obtain all users from collection "Users" in mongo server
 */

export const getAllUsers = async () => {
    try {
        let userModel = userEntity();

        // Seach all users
        return await userModel.find({isDelete: false})
}catch(error){
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
}
}

// -Get user by id
export const getUserByID = async(id:string) : Promise<any | undefined> =>{
    try{
        let userModel = userEntity();
        // Search user by id
        return await userModel.findById(id);


    }catch(error){
        LogError(`[ORM ERROR]: Getting Users By ID: ${error}`);
    }

}

// -Delete User by id
export const deleteUserByID = async(id:string) : Promise<any | undefined> =>{
    try{
        let userModel = userEntity();
        // Delete user by id
        return await userModel.deleteOne({ _id: id });


    }catch(error){
        LogError(`[ORM ERROR]: Deleting Users By ID: ${error}`);
    }
}

// -Create user
export const createUser = async (user:any) : Promise<any | undefined> =>{
    try{
        let userModel = userEntity();
        // Create new user
        return await userModel.create(user);

    }catch(error){
        LogError(`[ORM ERROR]: Creating Users: ${error}`);
    }
}
// -Update User by id
export const updateUserByID = async (user:any, id:string) : Promise<any | undefined> =>{
    try{
        let userModel = userEntity();
        // Update user
        return await userModel.findByIdAndUpdate(id,user);

    }catch(error){
        LogError(`[ORM ERROR]: Updating Users: ${id} ${error}`);
    }
}


