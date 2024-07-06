import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "@/utils/logger";

// CRUD

/**
 * Method to obtain all users from collection "Users" in mongo server
 */

export const GetAllUsers = async () => {
    try {
        let userModel = userEntity();

        // Seach all users
        return await userModel.find({isDelete: false})
}catch(error){
    LogError(`[ORM ERROR]: Getting All Users: ${error}`);
}
}

// TODO
// -Get user by id
// -Get user by email
// -Delete User by id
// -Update User by id
// -Create user