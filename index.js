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
var schema=new mongoose.Schema({name:String,date:String,count:Number})
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



ioo.on("connection", (socket) => {


function posiSoil() {
  socket.broadcast.emit('sttusBroadcast')
  socket.emit('statusSender')
}

socket.on('joined', () => {
  var ou = fs.readFileSync('his.json', 'utf8');
  var json = JSON.parse(ou);

  var d1 = json.data[json.data.length - 1];
  var t1 = json.date[json.date.length - 1];
console.log(d1)
  if (d1 === undefined) { } else {socket.emit('wel', d1, t1)}

})


socket.on('sent',(mess) => {
var d =moment().tz('Asia/dhaka').format('D/M/YY,h:m:s a')

  if (mess === "D0000000000") {
    var ou = fs.readFile('his.json', function (err, dat) {
      var json = JSON.parse(dat);
      json.data = [];
      json.date = [];
      json.num = ["0-"];
      fs.writeFileSync("his.json", JSON.stringify(json))
      socket.emit('reload')
      socket.broadcast.emit('reload')
    })
  } else if (mess === "eror" || mess === "Eror" || mess === "ERor" || mess === "EROr" || mess === "EROR") {
    socket.broadcast.emit('not')


  } else {
    fs.readFile('his.json', function (err, dat) {
      var json = JSON.parse(dat);
      json.data.push(mess);
      json.date.push(d);

      var l = json.num.length
      var nnp = l + '-'
      json.num.push(nnp);

      fs.writeFileSync("his.json", JSON.stringify(json))
      posiSoil()
    })
  }
})


socket.on('deji', (date) => {
  let ou = fs.readFileSync('his.json', 'utf8');
  let json = JSON.parse(ou);
  let e = json.date.indexOf(date)
  let dd = json.date[e + 1];
  let ddd = json.data[e + 1];
  let doo = json.date[e + 1];

  if (dd !== undefined) {
    socket.emit('newMsg', ddd, doo,)
  }

})

socket.on('dejiSender', (date) => {
  let ou = fs.readFileSync('his.json', 'utf8');
  let json = JSON.parse(ou);
  let e = json.date.indexOf(date)
  let dd = json.date[e + 1];
  let ddd = json.data[e + 1];
  let doo = json.date[e + 1];

  if (dd !== undefined) {
    socket.emit('newMsg', ddd, doo, 'noo')
  }

})


socket.on('deji0', () => {
  let ou = fs.readFileSync('his.json', 'utf8');
  let json = JSON.parse(ou);
  let d = json.data[0];
  let de = json.date[0];
  
    socket.emit('newMsg', d, de)
})


socket.on('deji0s', () => {
  let ou = fs.readFileSync('his.json', 'utf8');
  let json = JSON.parse(ou);
  let d = json.data[0];
  let de = json.date[0];
  
    socket.emit('newMsg', d, de, 'noo')
  

})


socket.on("loadhis", (ee) => {
  var ou = fs.readFileSync('his.json', 'utf8');
  var json = JSON.parse(ou);
  var e = json.date.lastIndexOf(ee)

  var dd = json.data[e - 1];
  var ttt = json.date[e - 1]

  if (e <= 0) { if (e == 0) { socket.emit("his", "No more data") } if (e < 0) { } }
  else { socket.emit("his", dd, ttt) }
});



});





{

  httpServer.listen(process.env.PORT || 8000);

  app.use('/', express.static(__dirname + '/views'));
  app.use(bodyParser.json())
  app.use(cors())



  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('etag', false)

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/1.html') 
    // res.render('ok1.ejs')
  })
  app.get('/lite', (req, res) => {
    res.render('ok2.ejs')
  })

app.get('/ok',(req,res) => {
  console.log(io)
  res.send('io')
})

  // ---------------------------------------------------

  app.post('/data', (req, res) => {
    var m = req.headers.m;
    var n = req.headers.n;
    var his = req.headers.his;
    var myInt = parseInt(n)
    var nnm = myInt + 1
    var nn = nnm + '-'
    // const de = new Date().toLocaleString('en-US', { timeZone: 'Asia/dhaka', timeStyle: 'medium', dateStyle: 'short', hourCycle: 'h24' })
    var de =moment().tz('Asia/dhaka').format('D/M/YY,  h:m:s a')


    if (m === 'D0000000000') {
      fs.readFile('his.json', function (err, dat) {
        var json = JSON.parse(dat);
        json.data = [];
        json.date = [];
        json.num = ["0-"];
        fs.writeFileSync("his.json", JSON.stringify(json))
      })
      res.removeHeader('X-Powered-By');
      res.removeHeader('Date');
      res.removeHeader('Connection');
      res.removeHeader('Content-Type');
      res.header("Content-Length", '<~`^>|');


      res.end()
    } else if (m == 'new' || m == 'NEW' || m == 'New') {
      var ou = fs.readFileSync('his.json', 'utf8');
      var json = JSON.parse(ou);
      var e = json.num.lastIndexOf(n)
      var dop = json.data[e];
      var d = dop
      var myInt = parseInt(n)
      var nnm = myInt + 1
      var nn = nnm + '-'
      res.removeHeader('X-Powered-By');
      res.removeHeader('Date');
      res.removeHeader('Connection');
      res.removeHeader('Content-Type');

      if (dop == undefined) {
        res.header("Content-Length", '<~`^>||]');

        res.end()
      } else {
        res.header("Content-Length", d);
        res.header("n", nn);

        res.end()
      }

    } else if (m == 'old' || m == 'OLD' || m == 'Old') {


      fs.readFile('his.json', function (err, dat) {
        var json = JSON.parse(dat);

        let e = json.num.lastIndexOf(his)
        let dd = json.data[e - 2];
        console.log(dd)

        if (dd !== undefined) {
          var myInt = parseInt(his)
          var nnm = myInt - 1
          var nn = nnm + '-'
          res.removeHeader('X-Powered-By');
          res.removeHeader('Date');
          res.removeHeader('Connection');
          res.removeHeader('Content-Type');

          res.header("Content-Length", dd);
          res.header("a", nn);

          res.end()

        } else {
          res.removeHeader('Date');
          res.removeHeader('Connection');
          res.removeHeader('Content-Type');

          res.header("Content-Length", '<~`^>||][');

          res.end()

        }


      })



    } else {

      fs.readFile('his.json', function (err, dat) {
        var json = JSON.parse(dat);

        json.data.push(m);
        json.date.push(de);
        json.num.push(nn);
        fs.writeFileSync("his.json", JSON.stringify(json))
      })
      res.removeHeader('X-Powered-By');
      res.removeHeader('Date');
      res.removeHeader('Connection');
      res.removeHeader('Content-Type');
      res.header("Content-Length", m);
      res.header("n", nn);


      res.end()
    }
  })


  app.get('/welcome', (req, res) => {
    fs.readFile('his.json', function (err, dat) {
      var json = JSON.parse(dat);
      var d1 = json.data[json.data.length - 1];
      var t1 = json.num[json.num.length - 1];
      var d2 = json.data[json.data.length - 2];
      var t2 = json.num[json.num.length - 2];

      res.removeHeader('X-Powered-By');
      res.removeHeader('Date');
      res.removeHeader('Connection');
      res.removeHeader('Content-Type');
      res.header("Content-Length", d1);
      res.header("t", t1);
      res.header("D2", d2);
      res.header("t2", t2);


      res.end()
    })


  })


}



