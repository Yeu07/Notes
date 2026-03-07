import type { Request, Response } from "express";
class NotesController{
    constructor(){}


    getNotes(req:Request, res:Response){}

    createNote(req:Request, res:Response){}

    updateNote(req:Request, res:Response){}

    deleteNote(req:Request, res:Response){}
}

export default new NotesController()