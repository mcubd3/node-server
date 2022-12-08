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
import fetch from 'node-fetch';




var DB='mongodb+srv://zayn:1221@cluster0.fzxdoyt.mongodb.net/db1?retryWrites=true&w=majority';mongoose.connect(DB)
.then(() => {console.log('con suc')}).catch((err) => {console.log(err)})
var schema=new mongoose.Schema({name:String,ram:String,device:String,platform:String,date:String,ipad:String,num:String,browserr:String})
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

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.set('trust proxy', true)
// app.use(express.json())
app.use(bodyParser.text({type:"*/*"}));
 


httpServer.listen(process.env.PORT || 8000);



app.post('/',async (req, res) => {

var d=await new collec({
  name:req.headers.reqs,
  date:moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
  ipad:req.ip,
  num:await collec.count() +1,
  browserr:req.headers.bro
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



  app.get('/loki',async (req, res) => {
       res.send('1')  

       var dd=await new collec({
        name:'loki express',
        date:moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
        ipad:req.ip,
        num:await collec.count() +1
      }).save()
})


app.post('/ndata',async (req, res) => {
  var d=await new collec({
    name:req.body,
    date:moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ipad:req.ip,
    num:await collec.count() +1,
    browserr:req.headers.bro
  }).save()
console.log(JSON.parse(req.body).a)
     res.send(req.body)

})



app.post('/ram',async (req, res) => {
  var d=await new collec({
    name:JSON.parse(req.body).name,
    ram:JSON.parse(req.body).ramxhw,
    device:JSON.parse(req.body).device,
    platform:JSON.parse(req.body).platform,
    date:moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ipad:req.ip,
    num:await collec.count() +1,
  }).save()

  res.send({...JSON.parse(req.body),num:await collec.count()})

})




app.get('/downmv',async (req, res) => {
  const response = await fetch('https://mcubd.netlify.app/mcubd.json'); 
  const body = await response.text()
  const statuss = await response.status;

  const arr=['0 value']

  if(statuss==200){
    arr.push('list from mcubd.json status '+statuss)
   var json= JSON.parse(body)


   for (let i = 0; i < json.mcubd.length; i++) { 
setTimeout(async () => {
    const res2 = await fetch(json.mcubd[i]); 
    const statuss2 = await res2.status
    if(statuss2!=200){ 
    // console.log('mcu n.'+i+' ' +statuss2+' "'+json.mcubd[i]+'"');
    arr.push('mcu n.'+i+' ' +statuss2+' "'+json.mcubd[i]+'"')
  }

}, 0);

   }

}else{
    // console.log('list from mcubd.json status '+statuss)
    arr.push('list from mcubd.json status '+statuss)
    
}
res.send(arr)


})




// var t=async () => {
//   var ge=await collec.count()
//  console.log(ge)
// }

// t()