
// require('dotenv').config()
import express from "express";
import AllRoutes from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express()
const port = 3000
app.use(express.json());
app.use(morgan('combined'))

app.use('/api/v1', AllRoutes)

mongoose.connect()

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