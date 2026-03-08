import { useState } from "react";
import { Link, useNavigate } from "react-router"; // Usamos useNavigate para volver al inicio
import { ArrowLeftIcon, SaveIcon, Loader2Icon } from "lucide-react";
import api from "../config/api"; // Tu instancia de axios configurada en el puerto 5001
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

function CreatePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully")
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        if(error.response?.status == 429){
          toast.error("Slow down  you're creating notes too fast")
        }else{
          toast.error("Failed to create note")
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          <Link 
            to={"/"} 
            className="btn btn-ghost hover:bg-orange-500/10 mb-8 text-orange-400 gap-2 px-0 hover:px-4 transition-all"
          >
            <ArrowLeftIcon className="size-5"/>
            Back to Notes
          </Link>
          
          <div className="card bg-base-200/40 backdrop-blur-xl border border-white/5 shadow-2xl">
            <div className="card-body p-8">
              <h2 className="card-title text-3xl font-bold mb-8 text-white">
                Create <span className="text-orange-500">New Note</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="form-control w-full">
                  <label className="label pb-3">
                    <span className="label-text text-gray-300 font-medium text-base">Note Title</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Escribe un título descriptivo..." 
                    className="input input-bordered w-full bg-black/30 focus:border-orange-500 transition-all text-lg h-14" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label pb-3">
                    <span className="label-text text-gray-300 font-medium text-base">Content</span>
                  </label>
                  <textarea 
                    placeholder="¿Qué tienes en mente hoy?"
                    className="textarea textarea-bordered w-full bg-black/30 focus:border-orange-500 h-52 text-base transition-all resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full h-14 text-lg shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.5)] transition-all gap-2"
                >
                  {loading ? (
                    <Loader2Icon className="size-5 animate-spin" />
                  ) : (
                    <SaveIcon className="size-5" />
                  )}
                  {loading ? "Saving..." : "Save Note"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;