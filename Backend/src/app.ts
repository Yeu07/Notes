import express from 'express';
import notesRoutes from './routes/notesRoutes.js'
import rateLimiter from './middleware/rateLimiter.js';


const app = express();
app.set('trust proxy', true);
app.use(express.json())
app.use(rateLimiter)
app.use("/notes",notesRoutes)





export default app;