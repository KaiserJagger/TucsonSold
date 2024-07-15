import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from '../../utils/logger';
import { IUser } from "../interfaces/IUser.interfaces";
import { IAuth } from "../interfaces/IAuth.interfaces";

//Enviroment variables
import dotenv from 'dotenv';

//BCRYPT for password
import bcrypt from 'bcrypt';

//JWT
import jwt from 'jsonwebtoken';
import { UserResponse } from "../types/UsersResponse.type";

//Configuration of enviroment variables
dotenv.config();

//Obtain Secret key to generate JWT
const secret = process.env.SECRET || 'MYSECRETKEY';

// CRUD

/**
 * Method to obtain all users from collection "Users" in mongo server
 */

export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        let response: any = {};

        //Search all users (using pagination)
        await userModel.find({isDeleted : false})
        .select('name email age')
        .limit(limit)
        .skip((page - 1 ) * limit)
        .exec().then((users: IUser[]) => {
            response.users = users;
        });

        //Count total documents in collections users
        await userModel.countDocuments().then((total: number) =>{
            response!.totalPages = Math.ceil(total / limit);        
            response!.currentPage = page;
        });

        return response;

    }catch(error){
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
}
}

// -Get user by id
export const getUserByID = async(id:string) : Promise<any | undefined> =>{
    try{

        let userModel = userEntity();
        // Search user by id
        return await userModel.findById(id).select('name email age');

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

//Register User
export const registerUser = async (user:IUser): Promise<any | undefined> =>{
    try{
        let userModel = userEntity();
        // Create new user
        return await userModel.create(user);

    }catch(error){
        LogError(`[ORM ERROR]: Creating Users: ${error}`);
    }
}

//Login User
export const loginUser = async (auth:IAuth): Promise<any | undefined> =>{
    try{
        let userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token = undefined;
        
        //Check if user exists by unique email
        await userModel.findOne({email: auth.email}).then((user: IUser) => {
            userFound = user;
        }).catch((error) =>{
            console.error(`[ERROR Authentication in ORM ] : User not found`);
            throw new Error(`[ERROR Authentication in ORM]: User not found ${error}`)
        });

        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

          //Check if password is valid (compare with bcrypt)
        if(!validPassword){
            console.error(`[ERROR Authentication in ORM ] : Password Not Valid`);
            throw new Error(`[ERROR Authentication in ORM]: Password Not Valid`)
        }

        //Generate JWT

        token = jwt.sign({email: userFound!.email}, secret, {
            expiresIn: "2h"
        });

        return{
            user: userFound,
            token: token
        }

    }catch(error){
        LogError(`[ORM ERROR]: Creating User: ${error} `);
    }
}
        //Logout User
        export const logoutUser = async (): Promise<any | undefined> => {

        }
       

