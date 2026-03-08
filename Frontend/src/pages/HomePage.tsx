import { useEffect, useState } from "react"
import RateLimitedUI from "../components/RateLimitedUI"
import api from "../config/api"
import NavBar from "../components/Navbar"
import type { Note } from "../types/Note"
import  { isAxiosError } from "axios" 
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"

function HomePage() {
  const [isRateLimited,setIsRateLimited] = useState<boolean>(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const fetchNotes = async() =>{
      try {
        const {data} = await api.get<Note[]>('/notes');
        setNotes(data)
        setIsRateLimited(false)
      } catch (error) {
        if(isAxiosError(error)){
          if (error.response?.status === 429) {
            setIsRateLimited(true);
          }else{
            toast.error("Failed to load notes")
          }
        }
      }finally{
        setLoading(false)
      }
    }

    fetchNotes()
  },[])
  return (
    <div className="min-h-screen">
      <NavBar/>
      {isRateLimited && <RateLimitedUI/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10"> Loading Notes ... </div>}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note =>(
              <NoteCard key={note._id} note={note}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
