import express from "express";
import AllRoutes from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = 3000
app.use(express.json());
app.use(morgan('combined'))

app.use('/api/v1', AllRoutes)

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




app.listen(3000,() =>{
    console.log(`Server app listening on port ${port}`)
})