import express, { type Response } from 'express';
import type { Request } from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js'
import rateLimiter from './middleware/rateLimiter.js';
import path from 'node:path';

const app = express();
const __dirname = path.resolve()

if(process.env.NODE_ENV !== 'production' ){
  app.use(cors({
  origin: process.env.FRONT_ORIGIN, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
  }));
}



app.set('trust proxy', true);
app.use(express.json())
app.use(rateLimiter)
app.use("/notes",notesRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../Frontend/dist")))

  app.get("/*splat",(req:Request,res:Response) => {
    res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
  })
}

export default app;