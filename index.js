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



var DB='mongodb+srv://zayn:1221@cluster0.fzxdoyt.mongodb.net/db1?retryWrites=true&w=majority';mongoose.connect(DB)
.then(() => {console.log('con suc')}).catch((err) => {console.log(err)})
var schema=new mongoose.Schema({name:String,date:String,ipad:String,num:String})
var collec=new mongoose.model('za',schema)


var __dirname = dirname(fileURLToPath(import.meta.url));


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
app.set('trust proxy', true)




httpServer.listen(process.env.PORT || 8000);



app.post('/',async (req, res) => {

var d=await new collec({
  name:req.headers.reqs,
  date:moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
  ipad:req.ip,
  num:await collec.count() +1
}).save()

  res.send('1') 
})




app.get('/',async (req, res) => {
 var ge=await collec.find().sort({_id:-1}).limit(1).skip(req.headers.n || 0)
  
    res.send(ge)  
  })

  app.get('/his',async (req, res) => {
    var ge=await collec.find().limit(1).skip(req.headers.n || 0)
     
       res.send(ge)  
     })

  app.get('/d0000000000',async (req, res) => {
      var ge=await collec.deleteMany()
       
         res.send(ge)  
  })


  const image = await loadImage(fs.readFileSync(__dirname 
    + 'log.png'));

  app.get('/log1',async (req, res) => {
       res.send(image)  

      //  var dd=await new collec({
      //   name:'logo express',
      //   date:moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
      //   ipad:req.ip,
      //   num:await collec.count() +1
      // }).save()
})


// var t=async () => {
//   var ge=await collec.count()
//  console.log(ge)
// }

// t()