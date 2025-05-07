import express from "express";
import cors from "cors";
import AllRoutes from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./models/user.schema.js";
import {Server} from 'socket.io';
import http from 'http';




const app = express()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true // ✅ Required
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true // ✅ Also required here
  }
});


io.on("connection" ,(socket) =>{
  console.log("Socket server connected",  socket.id);
socket.on('send_message', (data) => {
  console.log("Message recieved", data);
  io.emit("receive_message",{data});
});
socket.on("disconnect",() =>{
  console.log("User disconnected");
})
});

const port = 8000
app.use(morgan('combined'))
dotenv.config();

app.use(express.json());



app.use('/api/v1', AllRoutes)

mongoose.connect(process.env.MONGO_URI, {
  dbName: "backend",
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('Welcome to the backend  World!')
});

// app.get('/login',(req,res)=>{
//     res.send('begin the world !')
// });

app.get('/user', (req, res) => {

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

server.listen(8000, () => {
  console.log(`Server app listening on port ${port}`)
})
