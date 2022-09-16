import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import moment from 'moment-timezone';
import { createServer } from "http";
import { Server } from "socket.io";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import bodyParser from 'body-parser'



var __dirname = dirname(fileURLToPath(import.meta.url));
var DB='mongodb+srv://zayn:1221@cluster0.fzxdoyt.mongodb.net/db1?retryWrites=true&w=majority';mongoose.connect(DB)
.then(() => {console.log('con suc')}).catch((err) => {console.log(err)})
var schema=new mongoose.Schema({name:String,date:String,ip:Number})
var collec=new mongoose.model('za',schema)



const app = express();
const httpServer = createServer(app);
const ioo = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
},
allowEIO3: true
});

app.use(cors())





httpServer.listen(process.env.PORT || 8000);

app.post('/',async (req, res) => {
var d=await new collec({
  name:req.headers.reqs,
  date:moment().tz('Asia/dhaka').format('h:m a, D/M/YY'),
  ip:12
}).save()

  res.send(d) 
})



