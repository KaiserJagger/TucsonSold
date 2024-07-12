import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'

//Config dotenv to read enviroment variables
dotenv.config();

let secret = process.env.SECRET || 'MYSECRETKEY';
/**
 * 
 * @param { Request } req Original request previous middleware of verification JWT
 * @param { Response } res Response to verification of JWT
 * @param { NextFunction } next Next function to be executed 
 * @returns Error of verification or next execution
 */

    export const verifyToken = (req: Request, res: Response, next:NextFunction) => {
        //Check HEADER from Request for 'x-acces-token'
        let token:any = req.headers['x-access-token'];

        //Verify if jwt is present
        if(!token){
            return res.status(403).send({
                authentication: 'Missing JWT in request',
                message: 'Not authorized to consume this endpoint'
            });
        }

        //Verify the token
        jwt.verify(token, secret, (err:any, decoded:any) => {
            if(err){
                return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify JWT token in request'
            });
        }

        //Execute Next Function -> Protected Routes 
        next();

        });
     }




















