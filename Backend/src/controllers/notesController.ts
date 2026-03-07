import type { Request, Response } from "express";
import Note from "../models/noteModel.js";



class NotesController{
    constructor(){}


    async getAllNotes(req:Request, res:Response){
        try {
            const notes = await Note.find().sort({createdAt: -1});
            res.status(200).json(notes)
        } catch (error) {

            res.status(500).json({message:"Internal Server Error"})
        }
    }

    async getOneNote(req:Request, res:Response){
        try {
            const note = await Note.findById(req.params.id) 
            if(!note) res.status(404).json({message:"Note not Found"})
            res.status(200).json(note)
        } catch (error) {

            res.status(500).json({message:"Internal Server Error"})
        }
    }

    async createNote(req:Request, res:Response){
        const {title, content} = req.body;
        try {
            const newNote = new Note({
                title:title,
                content:content
            });

            const savedNote = await newNote.save()
            res.status(201).json(savedNote)
        } catch (error) {

            res.status(500).json({message:"Internal Server Error"})
        }
    }

    async updateNote(req:Request, res:Response){
        const {title, content} = req.body;
        try {
            const updatedNote =  await Note.findByIdAndUpdate(req.params.id,{title,content}, {new:true})

            if(!updatedNote) res.status(404).json({message:"Note not Found"})

            res.status(200).json(updatedNote)
        } catch (error) {

            res.status(500).json({message:"Internal Server Error"})
        }
    }

    async deleteNote(req:Request, res:Response){
         try {
            const deletedNote =  await Note.findByIdAndDelete(req.params.id)

            if(!deletedNote) res.status(404).json({message:"Note not Found"})

            res.status(200).json({message:"Note Deleted Successfully"})
        } catch (error) {

            res.status(500).json({message:"Internal Server Error"})
        }
    }
}

export default new NotesController()