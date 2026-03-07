import express from 'express';
import notesRoutes from './routes/notesRoutes.js'


const app = express();


app.use("/notes",notesRoutes)
app.use(express.json())




export default app;