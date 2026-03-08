import { Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"


function App() {
  return (
    <div data-theme="sunset">
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/create" element={<CreatePage/>}></Route>
            <Route path="/note/:id" element={<NoteDetailPage/>}></Route>
        </Routes>
    </div>
  )
}

export default App
