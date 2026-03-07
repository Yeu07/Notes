import mongoose from "mongoose";
import { timeStamp } from "node:console";
import { title } from "node:process";

const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        }
    },
    {timestamps:true}
);

const Note = mongoose.model("Note",noteSchema);

export default Note;