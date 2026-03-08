import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js'
import rateLimiter from './middleware/rateLimiter.js';


const app = express();
app.use(cors({
  origin: process.env.FRONT_ORIGIN, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.set('trust proxy', true);
app.use(express.json())
app.use(rateLimiter)
app.use("/notes",notesRoutes)





export default app;