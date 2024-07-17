import express , { Request, Response } from "express";
import { KatasController } from "../controller/KatasController";
import { LogInfo } from "../utils/logger";

//Body parser to read BODY from request
import bodyParser from "body-parser";
let jsonParser = bodyParser.json()

// JWT Verifier Middleware 
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { KataLevel, IKata } from "../domain/interfaces/IKata.interface";

// Router from express
let katasRouter = express.Router();

// http://localhost:3000/api/users?id=....
katasRouter.route('/')
// GET:
.get(verifyToken, async (req: Request, res: Response) =>{
    // Obtain a Query param
    let id: any = req?.query?.id;

    //Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param: ${id}`);
    // Controller Intance to execute method
    const controller: KatasController = new KatasController();
    // Obtain Response
    const response: any = await controller.getKatas(page, limit, id);
    // Send Response
    return res.status(response.status).send(response);
})
// DELETE:
.delete(verifyToken, async (req:Request, res:Response) => {
    // Obtain a Query param
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Intance to execute method
    const controller: KatasController = new KatasController();
    // Obtain Response
    const response: any = await controller.deleteKata(id);
    // Send Response
    return res.status(response.status).send(response);
})
// PUT:
.put(jsonParser, verifyToken, async (req:Request, res:Response) => {
     // Obtain a Query param
     let id: any = req?.query?.id;
    //Read from body
    let name: string = req?.body?.name;
    let description: string = req?.body?.description || '';
    let level: KataLevel = req?.body?.level || KataLevel.BASIC; 
    let intents: number = req?.body?.intents || 0; 
    let stars : number = req?.body?.stars || 0;
    let creator : string = req?.body?.creator
    let solution : string = req?.body?.solution;
    let participants : string[] = req?.body?.participants ||  [];

    if(name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0){
        
    // Controller Intance to execute method
    const controller: KatasController = new KatasController();

    let kata= {
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: solution,
        participants: participants
     };

     // Obtain Response
     const response: any = await controller.updateKata(id, kata);

      // Send Response
      return res.status(200).send(response);
    }else{
        return res.status(400).send({
            message: '[ERROR] Updating Kata. You need to send all attrs of Kata to update it '
        });
    }

})
.post(jsonParser, verifyToken,  async(req:Request, res:Response) => {
     //Read from body
     let name: string = req?.body?.name;
     let description: string = req?.body?.description || 'Default solution';
     let level: KataLevel = req?.body?.level || KataLevel.BASIC; 
     let intents: number = req?.body?.intents || 0; 
     let stars : number = req?.body?.stars || 0;
     let creator : string = req?.body?.creator
     let solution : string = req?.body?.solution;
     let participants : string[] = req?.body?.participants ||  [];
 
     if(name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0){
         
     // Controller Intance to execute method
     const controller: KatasController = new KatasController();
 
     let kata= {
         name: name,
         description: description,
         level: level,
         intents: intents,
         stars: stars,
         creator: creator,
         solution: solution,
         participants: participants
      };
 
      // Obtain Response
      const response: any = await controller.createKata(kata);
 
       // Send Response
       return res.status(201).send(response);
     }else{
         return res.status(400).send({
             message: '[ERROR] Craeting Kata. You need to send all attrs of Kata to update it '
         });
     }
})




export default katasRouter;

/**
 *Get document => 200 OK 
 * Creation Documents => 201 OK
 * Deletion of documents => 200 (entity) / 204 (No Return)
 * Update of documents => 200 (entity) / 204 (No return)
 */