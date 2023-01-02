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
import multer from 'multer'
import path from 'path'
import {fileTypeFromStream} from 'file-type';









var DB = 'mongodb+srv://zayn:1221@cluster0.fzxdoyt.mongodb.net/db1?retryWrites=true&w=majority'; mongoose.connect(DB)
  .then(() => { console.log('con suc') }).catch((err) => { console.log(err) })
var schema = new mongoose.Schema({ name: String, ram: String, device: String, platform: String, date: String, ipad: String, num: String, browserr: String })
var collec = new mongoose.model('za', schema)

var chat_schema = new mongoose.Schema({ data: String, ram: String, device: String, platform: String, date: String, ip: String, num: String, media: String,fname:String })
var chat_collec = new mongoose.model('chat_data', chat_schema)

var mv_links = new mongoose.Schema({ data: String, ram: String, device: String, platform: String, date: String, ip: String, num: String, media: String,fname:String })
var mv_collec = new mongoose.model('mvlink', mv_links)

 


var __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.set('trust proxy', true)
// app.use(express.json())

// app.use(bodyParser.json({
//   limit: '50mb'
// }));
app.use(bodyParser.text({ type: "*/*", limit: '50mb' }));

httpServer.listen(process.env.PORT || 8000);




app.post('/', async (req, res) => {

  var d = await new collec({
    name: req.headers.reqs,
    date: moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ipad: req.ip,
    num: await collec.count() + 1,
    browserr: req.headers.bro
  }).save()

  res.send('1')
})


app.get('/', async (req, res) => {
  var ge = await collec.find().sort({ _id: -1 }).limit(1).skip(req.headers.n || 0)

  res.send(ge)
})


app.get('/all', async (req, res) => {
  var ge = await collec.find().sort({ _id: -1 })

  res.send(ge)
})

app.get('/chatdata', async (req, res) => {
  // var ge = await chat_collec.find().sort({ _id: -1 }).limit(1).skip(req.headers.n | 0)
  // res.send(ge)
  var ge = await chat_collec.find({},{_id:0,ram:0,device:0,platform:0,__v:0}).sort({ _id: -1 }).limit(10)
  res.send(ge)
})


app.post('/chatdata', async (req, res) => {
  var number = await chat_collec.count()
  await new chat_collec({
    data: JSON.parse(req.body).data,
    date: moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ip: req.ip,
    num: number + 1,
    ram: JSON.parse(req.body).ram,
    device: JSON.parse(req.body).device,
    platform: JSON.parse(req.body).platform,
    media: JSON.parse(req.body).media,
    fname:JSON.parse(req.body).fname,
  }).save()

  res.send(await chat_collec.find({ num: number + 1 }).sort({ _id: -1 }).limit(1))
})


app.post('/chatdatahis', async (req, res) => {
  // var ge = await chat_collec.find({ num: req.body - 1 }).limit(1).skip(0)
  var ge = await chat_collec.find({ num:{$in: [req.body-1,req.body-2,req.body-3,req.body-4,req.body-5,req.body-6,req.body-7,req.body-8,req.body-9,req.body-10,req.body-11,req.body-12,req.body-13,req.body-14,req.body-15,req.body-16,req.body-17,req.body-18,req.body-19,req.body-20]} },{_id:0,ram:0,device:0,platform:0,__v:0}).sort({_id:-1})
  res.send(ge)
})


app.post('/chatdatanew', async (req, res) => {
  var ge = await chat_collec.find({ num: parseInt(req.body) + 1 }).sort({ _id: -1 }).limit(1)
  res.send(ge)
})


app.get('/chatdatanoti', async (req, res) => {
  var ge = await chat_collec.find().sort({ _id: -1 }).limit(1)

  var text = ge[0].device.toLowerCase();
  var text2 = ge[0].platform.toLowerCase();
  let result = text.match(/oppo f1s/i);
  let result2 = text2.match(/win32/i);


  if (result2) { res.send('nothing new') } else {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'key=AAAAh3rwJYY:APA91bG6BNcz-ommMEQEl7NdfGU3HtdoqBfBnPyPsNvb45q2rxuhFPnPAddXStJ4QuoKY2G0ygT_rzngv809hSkpT11rkCyHy_npJoHxzTca-GJZqpfltFQydL3U3St0KbfbfrcrjRH6'
      },
      body: JSON.stringify({
        "to": "c_i0MyCGNSi3XDSZX9KPR7:APA91bEwhy-FzPpCWELWbCqHvxW2cRdpJHZ41RNrA9Riv-zzQRVPu_P0Mc30_oKun8Z-cHlSmyQ8PHKJDEjV4gVNisq2nM7pwDqKCupqhcwP6AkxmoXB0zQERQ9pCGpdDkW9mrH0WjIv",
        "notification": {
          "title": "New Message",
          "body": ge[0].data,
          "image": "https://mcubd.netlify.app/logoimg/noti.png",
          "mutable_content": true,
          "sound": "Tri-tone"
        },

        //  "data": {
        //   "id" : 1,
        //   "text" : "new Symulti update !",
        //   "link" : "href://www.symulti.com"
        //     }
      }
      )
    };

    fetch('https://fcm.googleapis.com/fcm/send', options)
      .then(response => {
        res.send('response' + response.toString())
      }).catch(e => { res.send('eror' + e) })


  }







})

app.get('/not', async (req, res) => {
  // var ge = await chat_collec.find().sort({ _id: -1 }).limit(1)

  // var text = ge[0].device.toLowerCase();
  // var text2 = ge[0].platform.toLowerCase();
  // let result = text.match(/oppo f1s/i);
  // let result2 = text2.match(/win32/i);


  if (0) { res.send('nothing new') } else {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'key=AAAAh3rwJYY:APA91bG6BNcz-ommMEQEl7NdfGU3HtdoqBfBnPyPsNvb45q2rxuhFPnPAddXStJ4QuoKY2G0ygT_rzngv809hSkpT11rkCyHy_npJoHxzTca-GJZqpfltFQydL3U3St0KbfbfrcrjRH6'
      },
      body: JSON.stringify({
        "to": "eYENZKNwVVdYKF0DxMmGHx:APA91bH9Fr4GpAkTYyJgH29t3TWTig2E8Mq6w7WsjsaQtM03q5rs4oAc8lWmnsT0VQVQLsli-74phkO_chrdBjB8QXjHZoNXi0WWsqTkj0aY48y7MJMEAs3dBKBO6vhVX49Lsovc3DW_",
        "notification": {
          "title": "New Message",
          "body": 'ge[0].data',
          "image": "https://mcubd.netlify.app/logoimg/noti.png",
          "mutable_content": true,
          "sound": "Tri-tone"
        },

      }
      )
    };

    fetch('https://fcm.googleapis.com/fcm/send', options)
      .then(response => {
        res.send('response' + response.toString())
      }).catch(e => { res.send('eror' + e) })


  }

})



app.get('/pj', async (req, res) => {

  res.sendFile(__dirname + '/sevice-worker.html')
})



app.post('/pj', (req, res) => {

  console.log(req.body)




  res.send('ok')
})







app.get('/z.js', async (req, res) => {
  res.sendFile(__dirname + '/z.js')
})



app.get('/his', async (req, res) => {
  var ge = await collec.find().limit(1).skip(req.headers.n || 0)

  res.send(ge)
})

app.get('/d0000000000', async (req, res) => {
  var ge = await collec.deleteMany()

  res.send(ge)
})

app.get('/chathis/d0000000000', async (req, res) => {
  var ge = await chat_collec.deleteMany()

  res.send(ge)
})



app.get('/loki', async (req, res) => {
  res.send('1')

  var dd = await new collec({
    name: 'loki express',
    date: moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ipad: req.ip,
    num: await collec.count() + 1
  }).save()
})


app.post('/ndata', async (req, res) => {
  var d = await new collec({
    name: req.body,
    date: moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ipad: req.ip,
    num: await collec.count() + 1,
    browserr: req.headers.bro
  }).save()
  console.log(JSON.parse(req.body).a)
  res.send(req.body)

})



app.post('/ram', async (req, res) => {
  var d = await new collec({
    name: JSON.parse(req.body).name,
    ram: JSON.parse(req.body).ramxhw,
    device: JSON.parse(req.body).device,
    platform: JSON.parse(req.body).platform,
    date: moment().tz('Asia/dhaka').format('h:m a,D/M/YY'),
    ipad: req.ip,
    num: await collec.count() + 1,
  }).save()

  res.send({ ...JSON.parse(req.body), num: await collec.count() })

})

async function a(){
  let res= await mv_collec.findOne({name:'this'})
  let str=JSON.stringify(res)
  let json=JSON.parse(str)
  let links=json.links
  if(links[1] != '['){console.log('link is not array!'); return 'l' }
  let arr=JSON.parse(links)
  arr=[...arr[0],...arr[1],...arr[2]]

  let ar2 = []

  arr.forEach(i => {

    if(JSON.parse(i).length==1){
      ar2.push(JSON.parse(i)[0])
    }else{
          JSON.parse(i).forEach(item => {
            ar2.push(item)});
    }
    
  });
 



  let promisear=[]

  ar2.forEach(item => {
    promisear.push(fetch(item).then((res) => { return { status: res.status, url: item } }))
  });

  let resu=  await Promise.all(promisear)
  let ar3=['zero']
  resu.forEach(ele => {
    if(ele.status !='200'){ ar3.push(ele.url) }
  });

  console.log(ar3)

};
// a()


app.get('/downmv', async (req, res) => {

  // const response = await fetch('https://mcubd.netlify.app/mcubd.json');
  // const body = await response.text()
  // const statuss = await response.status

  // if (statuss == 200) {
  //   let json = JSON.parse(body)

  //   let arr = []

  //   json.mcubd.forEach(item => {
  //     arr.push(fetch(item).then((res) => { return { status: res.status, url: item, section: 'MCU' } }))
  //   });

  //   json.seris.forEach(item => {
  //     arr.push(fetch(item).then((res) => { return { status: res.status, url: item, section: 'Seris' } }))
  //   });

  //   json.fox.forEach(item => {
  //     arr.push(fetch(item).then((res) => { return { status: res.status, url: item, section: 'Fox' } }))
  //   });

  //   json.others.forEach(item => {
  //     arr.push(fetch(item).then((res) => { return { status: res.status, url: item, section: 'Others' } }))
  //   });

  //   Promise.all(arr).then((data) => { res.send(data) })





  // } else { res.send('mcubd.json status not 200') }
  let resp= await mv_collec.findOne({name:'this'})
  let str=JSON.stringify(resp)
  let json=JSON.parse(str)
  let links=json.links
  if(links[1] != '['){console.log('link is not array!'); return 'l' }
  let arr=JSON.parse(links)
  arr=[...arr[0],...arr[1],...arr[2]]

  let ar2 = []

  arr.forEach(i => {

    if(JSON.parse(i).length==1){
      ar2.push(JSON.parse(i)[0])
    }else{
          JSON.parse(i).forEach(item => {
            ar2.push(item)});
    }
    
  });
 



  let promisear=[]

  ar2.forEach(item => {
    promisear.push(fetch(item).then((res) => { return { status: res.status, url: item } }))
  });

  let resu=  await Promise.all(promisear)
  let ar3=['zero']
  resu.forEach(ele => {
    if(ele.status !='200'){ ar3.push(ele.url) }
  });

  console.log(ar3)
  res.send(ar3)
})



app.get('/fileup', async (req, res) => {res.sendFile(__dirname+'/z.html')})
const storage=multer.diskStorage({
  destination:(req,file,cb) => {
    var fold=path.join(__dirname,'..','..','..','Downloads')
    cb(null ,fold)
  },
  filename:(req,file,cb) => {
    const fext=path.extname(file.originalname);
    const fname=file.originalname
                .replace(fext,"")
                .toLowerCase()
                .split(" ")
                .join("-")+"-"+ Date.now();
                console.log(file.originalname)
    cb(null, fname+fext)
   
  }
})
const upload=multer({
storage:storage,
  limits:{fieldSize:100000000000000000000000},
}) 
app.post('/up',upload.single('NAME'),(req,res) => { res.send('kk') })
 

app.post('/filetype',async (req,res) => {
try{
  
  const response = await fetch(req.body);
  // console.log(response.body)
  const fileType = await fileTypeFromStream(response.body);
  console.log(fileType);res.send(fileType);
}catch(e){ console.log('eror'+e);res.send(e) }  
}) 


