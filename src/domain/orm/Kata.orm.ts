import { kataEntity } from "../entities/Kata.entity";
import { LogSuccess, LogError } from '../../utils/logger';
import { IKata } from "../interfaces/IKata.interface";

//Enviroment variables
import dotenv from 'dotenv';


//Configuration of enviroment variables
dotenv.config();

// CRUD

/**
 * Method to obtain all users from collection "Users" in mongo server
 */

export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        let response: any = {};

        //Search all users (using pagination)
        await kataModel.find({isDeleted : false})
        .limit(limit)
        .skip((page - 1 ) * limit)
        .exec().then((katas: IKata[]) => {
            response.katas = katas;
        });

        //Count total documents in collections "Katas"
        await kataModel.countDocuments().then((total: number) =>{
            response!.totalPages = Math.ceil(total / limit);        
            response!.currentPage = page;
        });

        return response;

    }catch(error){
    LogError(`[ORM ERROR]: Getting All Katas: ${error}`);
}
}

// -Get user by id
export const getKataByID = async(id:string) : Promise<any | undefined> =>{
    try{

        let kataModel = kataEntity();
        // Search user by id
        return await kataModel.findById(id);

    }catch(error){
        LogError(`[ORM ERROR]: Getting Katas By ID: ${error}`);
    }

}

// -Delete User by id
export const deleteKataByID = async(id:string) : Promise<any | undefined> =>{
    try{
        let kataModel = kataEntity();
        // Delete user by id
        return await kataModel.deleteOne({ _id: id });


    }catch(error){
        LogError(`[ORM ERROR]: Deleting Katas By ID: ${error}`);
    }
}

// -Create kata
export const createKata = async (kata:any) : Promise<any | undefined> =>{
    try{
        let kataModel = kataEntity();
        // Create new user
        return await kataModel.create(kata);

    }catch(error){
        LogError(`[ORM ERROR]: Creating Katas: ${error}`);
    }
}
// -Update Kata by id
export const updateKataByID = async (id:string, kata:IKata) : Promise<any | undefined> =>{
    try{
        let kataModel = kataEntity();
        // Update user
        return await kataModel.findByIdAndUpdate(id,kata);

    }catch(error){
        LogError(`[ORM ERROR]: Updating Katas: ${id} ${error}`);
    }
}

