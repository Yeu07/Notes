import express from 'express';
import notesRoutes from './routes/notesRoutes.js'
import type { Request, Response } from "express";


const app = express();

app.use("/notes",notesRoutes)
app.use(express.json())


app.listen(5001, () => {
    console.log("Server Started");
});

