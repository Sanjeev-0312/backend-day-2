import express from "express";
import cors from "cors";
import AllRoutes from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const app = express()
const port = 8000

app.use(morgan('combined'))

app.use(cors());  

app.use('/api/v1', AllRoutes)


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