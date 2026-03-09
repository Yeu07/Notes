import { useEffect, useState } from "react"
import type { Note } from "../types/Note"
import { Link, useNavigate, useParams } from "react-router"
import api from "../config/api"
import toast from "react-hot-toast"
import { ArrowLeftIcon, Loader2Icon, Trash2Icon, SaveIcon } from "lucide-react"
import { isAxiosError } from "axios"

function NoteDetailPage() {
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get<Note>(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        toast.error("Failed to fetch the note")
        navigate("/") 
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id, navigate])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate("/")
    } catch (error) {
      toast.error("Failed to delete the note")
    }
  }

  const handleSave = async() => {
    if(!note?.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content")
      return
    }
    setSaving(true)

    try {
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      toast.error("Failed to update note")
    }finally{
      setSaving(false)
    }

  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!note) return
    
    setSaving(true)
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content
      })
      toast.success("Note updated!")
      navigate("/")
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Failed to update note")
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Loader2Icon className="animate-spin size-12 text-orange-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <Link 
              to={"/"} 
              className="btn btn-ghost hover:bg-orange-500/10 text-orange-400 gap-2 px-0 hover:px-4 transition-all"
            >
              <ArrowLeftIcon className="size-5" />
              Back to notes
            </Link>
            
            <button 
              onClick={handleDelete} 
              className="btn btn-error btn-outline btn-sm gap-2 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            >
              <Trash2Icon className="size-4" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-200/40 backdrop-blur-xl border border-white/5 shadow-2xl">
            <div className="card-body p-8">
              <h2 className="card-title text-3xl font-bold mb-8 text-white">
                Edit <span className="text-orange-500">Note</span>
              </h2>

              <form onSubmit={handleUpdate} className="flex flex-col gap-6">
                
                <div className="form-control w-full">
                  <label className="label pb-3">
                    <span className="label-text text-gray-300 font-medium text-base">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-black/30 focus:border-orange-500 transition-all text-lg h-14"
                    value={note?.title || ""}
                    onChange={(e) => note && setNote({ ...note, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label pb-3">
                    <span className="label-text text-gray-300 font-medium text-base">Content</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full bg-black/30 focus:border-orange-500 h-64 text-base transition-all resize-none"
                    value={note?.content || ""}
                    onChange={(e) => note && setNote({ ...note, content: e.target.value })}
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={saving}
                  onClick={handleSave}
                  className="btn btn-primary w-full h-14 text-lg shadow-[0_0_25px_rgba(249,115,22,0.3)] gap-2 mt-4"
                >
                  {saving ? (
                    <Loader2Icon className="size-5 animate-spin" />
                  ) : (
                    <SaveIcon className="size-5" />
                  )}
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage