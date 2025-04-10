import express from "express";
import AllRoutes from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express()
const port = 8000

app.use(morgan('combined'))

app.use('/api/v1', AllRoutes)



// ✅ Enable CORS for your frontend origin BEFORE routes
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));  
  // ✅ Dummy test route (replace with your actual one)
  app.post('/api/v1/auth/register', (req, res) => {
    res.status(200).json({ message: 'Registered successfully!' });
  });



  app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get('/',(req, res)=>{
    res.send('Welcome to the backend  World!')
});

// app.get('/login',(req,res)=>{
//     res.send('begin the world !')
// });

app.get('/facebook', (req, res)=>{

    res.send('facebook.com')
});

app.listen(8000,() =>{
    console.log(`Server app listening on port ${port}`)
})