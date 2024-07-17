import { IKataController } from "./interfaces";
import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

//ORM
import { createKata, deleteKataByID, getAllKatas, getKataByID, updateKataByID } from '../domain/orm/Kata.orm'
import { IKata } from "../domain/interfaces/IKata.interface";


@Route("/api/katas")
@Tags("KatasController")


export class KatasController implements IKataController {
     createKata(kata: IKata): Promise<any> {
         throw new Error("Method not implemented.");
     }
     /**
     * Endpoint to retreive the Katas in the collection "Katas" of DB
     * @param {string} id Id of kata to retrieve (optional)
     * @return All katas or kata found by Id
    */
     @Get("/")
     public async getKatas(@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
 
         let response: any = '';
 
         if (id) {
             LogSuccess(`[/api/katas] Get Kata by ID: ${id}`)
             response = await getKataByID(id);
         } else {
             LogSuccess('[/api/katas] Get all Katas request')
             response = await getAllKatas(page, limit);
         }
 
         return response;
     }
     /**
      * Endpoint to delete the katas in the collection "Katas" of DB
      * @param {string} id Id of Kata to retreive (optional)
      * @returns Message informing if deletion was correct
     */
     @Delete("/")
     public async deleteKata(@Query() id?: string): Promise<any> {
         let response: any = '';
 
         if (id) {
             LogSuccess(`[/api/katas] Delete katas by ID: ${id}`)
             await deleteKataByID(id).then((r) => {
                 response = {
                 status: 204,
                 message: `Kata with id ${id} deleted successfully`
                 }
             });
         } else {
             LogWarning('[/api/katas] Delete Kata request WITHOUT ID')
             response = {
                 message: 'Please, provide an ID to remove from database'
             }
         }
 
         return response;
     }
 
     @Post("/")
     public async registerKata(kata: IKata): Promise<any> {
     
         let response: any = ''; 
 
         if (kata) {
             LogSuccess(`[/api/katas] Create new kata: ${kata.name}`)
              await createKata(kata).then((r) => {
                 LogSuccess(`[/api/katas] Created kata: ${kata.name}`)
                 response = {
                     status: 201,
                     message: `Kata create: ${kata.name}`
                 }
             }); 
         }  else {
             LogWarning('[/api/katas] Register needs Kata Entity ')
             response = {
                 message: 'Kata not Registered: Please, provide a kata entity to create one '
             }
         }
 
         return response;
     }
     
     @Put("/")
     public async updateKata(@Query()id:string ,kata: IKata): Promise<any> {
       
         let response: any = '';
         
         if (id) {
             LogSuccess(`[/api/katas] Update Katas by ID: ${id}`)
             await updateKataByID(id, kata).then((r) => {
                 response = {
                 message: `Kata with id ${id} updated successfully`,
                 status:204
                 }
             });
         } else {
             LogWarning('[/api/Katas] Update Kata request WITHOUT ID')
             response = {
                 message: 'Please, provide an ID to update an existing Kata',
                 status: 400
             }
         }
 
         return response;
     }
    
}