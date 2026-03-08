import { Link } from "react-router"
import type { Note } from "../types/Note";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/util";
import api from "../config/api";
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction } from "react";

interface NoteCardProps {
  note: Note; 
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

const NoteCard = ({note,setNotes}: NoteCardProps) => {

    const handleDelete = async(e:React.FormEvent,id:string) => {
        e.preventDefault()
        e.stopPropagation();
        if(!window.confirm("Are you sure want to delete this note?")) return

        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success("Note deleted successfully")
        } catch (error) {
            toast.error("Failed to delete note")
        }

    }

  return (
    <Link to={`/notes/${note._id}`} className="card bg-base-100  hover:shadow-lg transition-all duration-200  border-t-4 border-solid border-[#c1880d]">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4"/>
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard
