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
import multer  from 'multer'
import path  from 'path'







var DB='mongodb+srv://zayn:1221@cluster0.fzxdoyt.mongodb.net/db1?retryWrites=true&w=majority';mongoose.connect(DB)
.then(() => {console.log('con suc')}).catch((err) => {console.log(err)})
var schema=new mongoose.Schema({name:String,ram:String,device:String,platform:String,date:String,ipad:String,num:String,browserr:String})
var collec=new mongoose.model('za',schema)

var chat_schema=new mongoose.Schema({data:String,ram:String,device:String,platform:String,date:String,ip:String,num:String})
var chat_collec=new mongoose.model('chat_data',chat_schema)




var __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.set('trust proxy', true)
// app.use(express.json())

// app.use(bodyParser.json({
//   limit: '50mb'
// }));
app.use(bodyParser.text({type:"*/*",limit:'50mb'}));
 
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

app.get('/chatdata',async (req, res) => {
  var ge=await chat_collec.find().sort({_id:-1}).limit(1).skip(req.headers.n |0)
  res.send(ge)  
})

app.post('/chatdata',async (req, res) => {
  var number=await chat_collec.count()
    await new chat_collec({
    data:JSON.parse(req.body).data,
    date:moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ip:req.ip,
    num:number +1,
    ram:JSON.parse(req.body).ram,
    device:JSON.parse(req.body).device,
    platform:JSON.parse(req.body).platform,
  }).save()
  
    res.send(await chat_collec.find({num:number+1}).sort({_id:-1}).limit(1))    
})


app.post('/chatdatahis',async (req, res) => {
  var ge=await chat_collec.find({num:req.body -1 }).limit(1).skip(0)
   
     res.send(ge)  
   })

app.post('/chatdatanew',async (req, res) => {
    var ge=await chat_collec.find({num:parseInt(req.body)+1}).sort({_id:-1}).limit(1)
    res.send(ge)  
})


app.get('/chatdatanoti',async (req, res) => {
  var ge=await chat_collec.find().sort({_id:-1}).limit(1)

  var text = ge[0].device.toLowerCase();
  var text2 = ge[0].platform.toLowerCase();
  let result = text.match(/oppo f1s/i);
  let result2 = text2.match(/win32/i);


  // if( result2){res.send('nothing new')}else{
  //     res.send('send noti')  


  // }


  // fetch()
const options = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  body: JSON.stringify({
    name: 'David',
    age: 45
  })
};

fetch('https://fcm.googleapis.com/fcm/send')
  .then(response => {
    res.send(response)
  }).catch(e=>{res.send(e)})


   
})



app.get('/pj',async (req, res) => {

    res.sendFile(__dirname+'/sevice-worker.html')
  })



  app.post('/pj',(req, res) => {

 console.log(req.body) 


 

    res.send('ok')  
  }) 
 






  app.get('/z.js',async (req, res) => {
        res.sendFile(__dirname+'/z.js')
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
  const statuss = await response.status
  
  if(statuss==200){
     let json= JSON.parse(body)

     let arr=[]

     json.mcubd.forEach(item => {
         arr.push(fetch(item).then((res)=>{ return {status:res.status,url:item,section:'MCU'}}))
     });
     
     json.seris.forEach(item => {
         arr.push(fetch(item).then((res)=>{ return {status:res.status,url:item,section:'Seris'}}))
     });
     
     json.fox.forEach(item => {
         arr.push(fetch(item).then((res)=>{ return {status:res.status,url:item,section:'Fox'}}))
     });
     
     json.others.forEach(item => {
         arr.push(fetch(item).then((res)=>{ return {status:res.status,url:item,section:'Others'}}))
     });
     
    //  Promise.all(arr).then((data)=>console.table(data))
    Promise.all(arr).then((data)=>{res.send(data)})

     



    }else{res.send('mcubd.json status not 200')}
})




// var t=async () => {
//   var ge=await collec.count()
//  console.log(ge)
// }

// t()