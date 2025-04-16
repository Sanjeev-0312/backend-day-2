import express from "express";
import cors from "cors";
import AllRoutes from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./models/user.schema.js";



const app = express()
const port = 8000
app.use(morgan('combined'))
dotenv.config();
app.use(cors());  
app.use(express.json());



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

app.get('/user', (req, res)=>{

    res.json('facebook.com')
});

 app.get('/users', async (req, res) => {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          res.status(500).json({ error: 'Server error' });
        }
      })

app.listen(8000,() =>{
    console.log(`Server app listening on port ${port}`)
})
