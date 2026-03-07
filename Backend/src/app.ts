import express from 'express';
import notesRoutes from './routes/notesRoutes.js'


const app = express();

app.use(express.json())
app.use("/notes",notesRoutes)





export default app;