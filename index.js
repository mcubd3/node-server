<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <title>Chat</title>
  <meta http-equiv="Cache-control" content="public">
  <link href="https://mcubd.github.io/mcubd/chat/1.css" rel="stylesheet">

  

  <style>
    .arrow{
      height: 36px;
      width: 36px;
      background-color: rgb(69, 151, 223);
      position: fixed;
      right: 10vw;
      top: 40vh;

    }

  </style>
</head>

<body>

  <div id="body">


    <div id="status" style="display: none;">
      <div class="bar">
        <div id="progress" class="progress"></div>
      </div>
      <span id="two" class="upspan two">0%</span>



    </div>

    <div id="loading" style="opacity: 0;">
      <lottie-player src="./loading.json" background="transparent" speed="1" style=" width: 15%;margin: 0 auto;" loop
        autoplay></lottie-player>


    </div>
    <h5 id="h5"></h5>
    <ul id="messages" style="opacity: 0;"></ul>
    <br><br><br><br>

    <form id="form" action="">
      <div class="box">
        <hr>

        <!-- gallary logo svg -->

        <label id="file">




          <svg fill="#000000" viewBox="0 0 64 64">
            <path
              d="M49,13c3.314,0,6,2.686,6,6v26c0,3.314-2.686,6-6,6H15c-3.314,0-6-2.686-6-6V19c0-3.314,2.686-6,6-6H49z M23,23	c-2.209,0-4,1.791-4,4c0,2.209,1.791,4,4,4c2.209,0,4-1.791,4-4C27,24.791,25.209,23,23,23z M51,45v-3.566l-9.319-8.38	c-1.524-1.37-3.836-1.367-5.356,0.006l-7.922,7.158l-3.793-3.244c-1.501-1.284-3.714-1.28-5.211,0.009L13,42.496V45	c0,1.105,0.895,2,2,2h34C50.104,47,51,46.105,51,45z">

            </path>
          </svg>
          <input id="f" onchange="gotfile(event)" type="file" />

        </label>


        <textarea id="input" rows="1" placeholder="Type..." autocomplete="off" autocorrect="off"
          spellcheck="false"></textarea>



        <!-- Send logo svg -->
        <svg id="send" onclick="sendclick()" viewBox="0 0 24 24" id="trt">
          <path
            d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z">
          </path>
        </svg>


      </div>
    </form>


  </div>

  <div id="full" style="display: none; ">
  </div>


<div onclick="scrol()" id="arrow" style="display: none;" class="arrow"><img width="100%" src="https://firebasestorage.googleapis.com/v0/b/test2-5bbd8.appspot.com/o/dow.png?alt=media&token=fb158794-10dd-44bd-bb7f-11c068270fa0" alt=""></div>



  <script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { getFirestore, collection, addDoc ,query, orderBy, limit,getDocs , doc, setDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    const firebaseConfig = {
      apiKey: "AIzaSyBzaFL1XOU-_152duOo0baL1DfgVVuSwMI",
      authDomain: "test2-5bbd8.firebaseapp.com",
      databaseURL: "https://test2-5bbd8-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "test2-5bbd8",
      storageBucket: "test2-5bbd8.appspot.com",
      messagingSenderId: "683307239625",
      appId: "1:683307239625:web:d28ed1c2fb6b31dd4e6518"
    };


    const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


    // Initialize Firestore
    const firestore = getFirestore(app);
    var fileitem, filename, percent


    window.sendclick= function () {
      let value = document.getElementById('input').value.replace(/^\s+|\s+$/g, '')
      // if (value.length>0) { dbsend(value, 'normal') }
      if (value.length>0) { dbsend(value, 'text') }

    }
 

window.scrol=function (){
  window.scrollTo({ top: document.body.scrollHeight, left:0, behavior: 'smooth' })

  document.getElementById('arrow').style.display='none'

}


    // -----------a-get
    async function get() {


      const chat =collection(firestore,'chat')
    const q = query(chat, orderBy("num", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    // const lastdoc=querySnapshot.docs[0].data().num


      // var a = await chat.orderBy('num', 'desc').limit(10).get()


     await querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        let obj=doc.data()

        if (obj.media !='text') {
          // if (arr.length == ind + 1) {
          //   print2(obj, 'firstload', 'show')
          // } else { 
            print2(obj,'') 


        }
        else {
          print(obj)

        }


      });

      document.getElementById('messages').style.opacity = '1'
      window.scroll(0, document.body.scrollHeight)



    }; get()

    function copy(ele) {
      console.log('copied:' + ele.parentElement.firstChild.innerText)
      navigator.clipboard.writeText(ele.parentElement.firstChild.innerText)

      console.log(ele)
      ele.innerHTML = `
<svg id="Layer_1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m256 48.49a208 208 0 0 1 147.08 355.08 208 208 0 1 1 -294.16-294.15 206.64 206.64 0 0 1 147.08-60.93m0-48c-141.38 0-256 114.62-256 256s114.62 256 256 256 256-114.61 256-256-114.62-256-256-256z"></path><path d="m218.08 367.23a24 24 0 0 1 -17-7l-82.63-82.63a24 24 0 0 1 33.94-33.94l65.24 65.23 139.82-146.89a24 24 0 1 1 34.77 33.09l-156.76 164.69a24 24 0 0 1 -17.08 7.45z"></path></svg>
`



      // ele.children[0].stop()

      setTimeout(() => {
        ele.innerHTML = `
        <svg id="Layer_1" height="100%" width="100%" enable-background="new 0 0 64 64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g><path d="m52.77 9.37h-3.87v-3.86c0-2.99-2.44-5.43-5.43-5.43h-30.25c-2.99 0-5.43 2.44-5.43 5.43v43.51c0 2.99 2.44 5.43 5.43 5.43h3.87v3.87c0 2.99 2.44 5.43 5.43 5.43h30.25c2.99 0 5.43-2.44 5.43-5.43v-43.52c0-2.99-2.43-5.43-5.43-5.43zm-42.11 39.64v-43.5c0-1.42 1.15-2.57 2.57-2.57h30.25c1.42 0 2.57 1.15 2.57 2.57v43.51c0 1.42-1.15 2.57-2.57 2.57h-30.26c-1.41-.01-2.56-1.16-2.56-2.58zm44.68 9.3c0 1.42-1.15 2.57-2.57 2.57h-30.25c-1.42 0-2.57-1.15-2.57-2.57v-3.87h23.52c2.99 0 5.43-2.44 5.43-5.43v-36.78h3.87c1.42 0 2.57 1.15 2.57 2.57z"></path></g></svg>
        `

      }, 4000);
    }





    var print = function (obj, append_type, ne) {

      var node = document.createElement('li')
      var num = document.createElement('span')
      var ip = document.createElement('span')
      var txt = document.createElement('span')
      var time = document.createElement('span')
      var copy = document.createElement('button')
      node.setAttribute("id", obj.num)
      copy.setAttribute("class", "copy")
      txt.setAttribute("class", "data-span")
      copy.setAttribute("onClick", "copy(this)")
      ip.setAttribute("style", "float:right; ")
      // node.setAttribute("style", "opacity:0; ")
      ip.setAttribute("class", "ipspan")
      txt.innerText = obj.data
      ip.textContent = ' ' + '[' + obj.ip + ']'
      time.textContent = obj.date
      num.textContent = obj.num
      num.setAttribute("class", "block")
      copy.style.cssText = 'width:6.8%;opacity:.8;'
      //if(obj.deleted){node.style.cssText = 'display:none';}
      ip.style.opacity = `.2`
      copy.innerHTML = `
        <svg id="Layer_1" height="100%" width="100%" enable-background="new 0 0 64 64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g><path d="m52.77 9.37h-3.87v-3.86c0-2.99-2.44-5.43-5.43-5.43h-30.25c-2.99 0-5.43 2.44-5.43 5.43v43.51c0 2.99 2.44 5.43 5.43 5.43h3.87v3.87c0 2.99 2.44 5.43 5.43 5.43h30.25c2.99 0 5.43-2.44 5.43-5.43v-43.52c0-2.99-2.43-5.43-5.43-5.43zm-42.11 39.64v-43.5c0-1.42 1.15-2.57 2.57-2.57h30.25c1.42 0 2.57 1.15 2.57 2.57v43.51c0 1.42-1.15 2.57-2.57 2.57h-30.26c-1.41-.01-2.56-1.16-2.56-2.58zm44.68 9.3c0 1.42-1.15 2.57-2.57 2.57h-30.25c-1.42 0-2.57-1.15-2.57-2.57v-3.87h23.52c2.99 0 5.43-2.44 5.43-5.43v-36.78h3.87c1.42 0 2.57 1.15 2.57 2.57z"></path></g></svg>
        `
      node.append(txt, num, copy, time, ip);





      if (append_type == 'down') {
        let ul = document.getElementById('messages').lastChild
        if (ul) {
          if (obj.num == ul.children[1].innerText) { return 'j' }

          if (Number(obj.num) < Number(ul.children[1].innerText)) { return 'l' }

        }

        messages.appendChild(node);
        if(bottomdist() >200){
        document.getElementById('arrow').style.display='block'
      }

      }
      else {
        let ul8 = document.getElementById('messages').children[0]
        if (ul8) {
          if (obj.num == ul8.children[1].innerText) { return 'j' }
          
          if (Number(obj.num) > Number(ul8.children[1].innerText)) { return 'l' }
        }
        console.log(111)
        messages.insertBefore(node, document.getElementById('messages').children[0])
        
        // messages.appendChild(node);
      }



    }



    window.onscroll = function (ev) {

      // if (window.scrollY < 130) { loadHis() }
      // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {  you're at the bottom of the page }
      // console.log(window.scrollY)
    };

    var print2 = function (obj, append_type, ne) {

      var node = document.createElement('li')
      var clickdiv = document.createElement('div')
      var num = document.createElement('span')
      var ip = document.createElement('span')
      var time = document.createElement('span')
      num.textContent = obj.num
      node.setAttribute("id", obj.num)
      num.setAttribute("class", "block")
      ip.setAttribute("class", "ipspan")
      time.innerText = obj.date
      ip.innerText = '[' + obj.ip + ']'
      ip.style.cssText = `float:right;opacity:.2`
      node.style.cssText = `margin-bottom:calc(7vh)`
      // if(obj.deleted){node.style.cssText = 'display:none';}
      num.style.cssText = `margin-top:calc(.1vh);opacity:.1;`
      time.style.cssText = `margin-left:calc(1vh)`

      clickdiv.style.cssText = 'border:4px solid green; width: calc(45vw);height:calc(36vh);background-color:black;position: relative;overflow:hidden'


      if (obj.media == 'img') {
        var img = document.createElement('img'); img.setAttribute("src", obj.data)
        img.style.cssText = 'height: 100%;position: relative;left: 50%;transform: translateX(-50%);'
        img.setAttribute("class", "imgsq"); clickdiv.setAttribute("onclick", "full(this)")
        clickdiv.append(img)
      }
      else if (obj.media == 'audio') {
        clickdiv.style.cssText = 'border:4px solid white; width: calc(80vw);height:calc(6vh);background-color: rgba(0, 0, 0, 0);position: relative;overflow:hidden'

        var aud = document.createElement('audio')
        aud.src = obj.data;
        aud.setAttribute("controls", true)
        aud.style.cssText = 'height:100%'
        clickdiv.append(aud)
      }
      else if (obj.media == 'vid') {
        var vid = document.createElement('video')
        var play = document.createElement('div')

        play.style.cssText = `position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);display:inline;`

        play.innerHTML = `
        <svg id="Layer_1" style=" display:block;margin-left:auto; margin-right:auto; "  width="50%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
      <circle cx="256" cy="256" fill="#2d4a60" r="224"  style="fill: rgba(0, 0, 0,.2);"></circle>
      <path d="m361.24 235.054-143.627-82.923a24.186 24.186 0 0 0 -36.28 20.946v165.846a24.186 24.186 0 0 0 36.28 20.946l143.627-82.923a24.187 24.187 0 0 0 0-41.892z" fill="#eaeff0" style="fill: rgb(255, 255, 255);"></path>
      
      <path d="m256 490.667a234.667 234.667 0 0 1 -165.935-400.601 234.666 234.666 0 1 1 331.869 331.868 233.127 233.127 0 0 1 -165.934 68.733zm0-448c-117.633 0-213.334 95.7-213.334 213.333s95.701 213.333 213.334 213.333 213.333-95.701 213.333-213.333-95.701-213.333-213.333-213.333z" fill="#000000" style="fill: rgb(255, 255, 255);"></path>
      
      <!-- <path d="m205.519 373.831a34.986 34.986 0 0 1 -34.853-34.908v-165.846a34.854 34.854 0 0 1 52.281-30.184l143.627 82.923a34.853 34.853 0 0 1 0 60.367l-143.627 82.923a34.783 34.783 0 0 1 -17.428 4.725zm.069-214.323a13.924 13.924 0 0 0 -6.828 1.86 13.285 13.285 0 0 0 -6.76 11.709v165.846a13.52 13.52 0 0 0 20.28 11.708l143.627-82.923a13.521 13.521 0 0 0 0-23.417l-143.627-82.923a13.225 13.225 0 0 0 -6.692-1.86z" fill="#000000" style="fill: rgb(184, 76, 76);"></path> -->
      </svg>

        `

        vid.src = obj.data;

        vid.style.cssText = 'height: 100%; position: relative;left: 50%;transform: translateX(-50%);'
        vid.setAttribute('controlsList', 'noplaybackrate  ')
        vid.setAttribute('oncontextmenu', 'return false;')
        vid.disablePictureInPicture = true;
        clickdiv.setAttribute("onclick", "fullvid(this)")
        clickdiv.append(vid, play)
      }
      else {

        clickdiv.style.cssText = 'border:4px solid green; width: calc(90vw);height:calc(10vh);background-color: rgba(0, 0, 0, 0);position: relative;overflow:hidden'

        var sure = document.createElement('div')
        // a.innerText='click'
        sure.style.cssText = `background-color:red;height:100%`
        sure.innerText = obj.data

        sure.setAttribute("onclick", "down(this)")
        // aud.style.cssText = 'width:100%;'
        clickdiv.append(sure)

      }



      node.append(clickdiv, num, time, ip)

      if (append_type == 'down') {
        let ul = document.getElementById('messages').lastChild
        if (ul) {
          if (obj.num == ul.children[1].innerText) { return 'j' }

          if (Number(obj.num) < Number(ul.children[1].innerText)) { return 'l' }

        }

        messages.appendChild(node);
        if(bottomdist() >200){
        document.getElementById('arrow').style.display='block'
      }

      }
      else {
        let ul8 = document.getElementById('messages').children[0]
        if (ul8) {
          if (obj.num == ul8.children[1].innerText) { return 'j' }

          if (Number(obj.num) > Number(ul8.children[1].innerText)) { return 'l' }
        }

        messages.insertBefore(node, document.getElementById('messages').children[0])
      }


      // if (his == 'hisprint') {

      //   let ul8 = document.getElementById('messages').children[0]
      //   if (ul8) {
      //     if (obj.num == ul8.children[1].innerText) { return 'j' };
      //     if (Number(obj.num) > Number(ul8.children[1].innerText)) { return 'l' }
      //   }

      //   messages.insertBefore(node, document.getElementById('messages').children[0])
      // }
      // else if (his == 'firstload') {

      //   if (document.getElementById('messages').childElementCount == 0) {
      //     messages.appendChild(node);
      //   }
      //   else {
      //     messages.insertBefore(node, document.getElementById('messages').children[0])
      //   }

      //   if (ne == 'show') {
      //     setTimeout(() => { window.scroll(0, document.body.scrollHeight) }, 800); setTimeout(() => {
      //       document.getElementById('messages').style.opacity = '1'
      //     }, 800);
      //   }


      // }
      // else {

      //   let ul = document.getElementById('messages').lastChild
      //   if (ul) {
      //     if (obj.num == ul.children[1].innerText) { return false }
      //   }
      //   messages.appendChild(node);

      // }


    }



    function down(e) {
      if (confirm("Download the file?")) { open(e.innerHTML, "_self") }
    }

    function full(ele) {
      console.log(ele.children[0].src)
      document.getElementById('body').style.opacity = '0'
      document.body.style.backgroundColor = '#141412'


      var tempo = document.getElementById('full')
      var cut = document.createElement('button')
      var img = document.createElement('img')
      img.setAttribute("src", ele.children[0].src)
      img.setAttribute("alt", 'image not found')


      tempo.style.cssText = 'background-color:#141412;position: fixed;top: 0;left: 0;bottom: 0;right: 0;display: flex; overflow-y:scroll;overflow-x:scroll;z-index:1 ;'
      img.style.cssText = 'width:100% ;margin: auto auto; '


      cut.textContent = 'x'
      cut.style.cssText = ' position:fixed;top:3.3%;right:4.4%; background-color: rgb(0,0,0, 0.2);outline: none !important;border: none !important;font-size:150%;color:white;z-index: 1;height:50px;width:50px;border-radius:25px; box-shadow: 1px 1px 15px  rgba(255, 255, 255,.6);'

      document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width, initial-scale=1.0");





      document.body.style.overflow = 'hidden';

      cut.onclick = function () {
        tempo.innerHTML = ''; tempo.style.display = 'none'
        document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");
        document.body.style.overflow = '';
        document.getElementById('body').style.opacity = '1'
        document.body.style.backgroundColor = ''

      }




      tempo.append(img, cut)
      // document.body.append(tempo)
    }

    addEventListener('fullscreenchange', (e) => {
      if (document.fullscreenElement) { }
      else {
        const vid = document.getElementsByTagName('video')
        for (const i of vid) { i.pause(); }
      }
    });

    function fullvid(ele) {
      screen.orientation.lock('landscape')
      ele.getElementsByTagName('video')[0].requestFullscreen();
      ele.getElementsByTagName('video')[0].play()

    }


   window.dbsend= async function (msgdata, media, file) {
      let type='text'
      let fname

      if (media != 'text') {

          fname=file.name
          let filetype = file.type.toLowerCase();

          let resimg = filetype.match(/image/i)
          let resaudio = filetype.match(/audio/i)
          let resvid = filetype.match(/video/i)

          if (resimg) {
            type = 'img';
          } else if (resaudio) {
            type = 'audio';
          } else if (resvid) {
            type = 'vid';
          } else {
            type = 'file';
          }

      }







    const res = await fetch('https://gifted-pear-loincloth.cyclic.cloud/firestore_write',{
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({data:String(msgdata),media:String(type),fname:String(fname)})
});
if(res.ok){ws('down'); document.getElementById('input').value = ''
       setTimeout(() => {
        // window.scroll(0, document.body.scrollHeight)
        window.scrollTo({ top: document.body.scrollHeight, left:0, behavior: 'smooth' });
      }, 800);}

    
  



    }

    function loadHis() {
      let last = document.getElementById('messages')

      if (last.children[0].querySelector('.block').innerText == 1) {
        if (document.body.offsetHeight > window.innerHeight * 1.5) {
          document.getElementById('h5').innerText = 'No more history found'
          setTimeout(() => {
            document.getElementById('loading').style.opacity = '0';
          }, 800);

        }
      }
      else {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'https://gifted-pear-loincloth.cyclic.cloud/chatdatahis', true);

        xhttp.onload = function () {
          if (this.responseText == '[]') {
            //  document.getElementById("h5").innerHTML = 'nai'
          }
          else {

            const arr = JSON.parse(this.responseText)
            let maxar = []
            arr.forEach((item, ind) => { maxar.push(item.num) });
            let maxnum = Math.max(...maxar)


            arr.forEach((item, ind) => {

              let obj = arr.find((i) => {
                return i.num == document.getElementById('messages').children[0].children[1].innerText - 1
              })

              if (obj != undefined) {
                if (obj.media) {
                  print2(obj, 'hisprint')
                }
                else {

                  if (arr.length == ind + 1) {
                    print(obj, 'hisprint', 'show')
                  } else { print(obj, 'hisprint') }

                }
              }

            });

          }
        }


        xhttp.send(last.children[0].children[1].innerText);

      }
    }


   window.neww= async function () {

        
    const chat =collection(firestore,'chat')
    const q = query(chat, orderBy("num", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.docs.length==0){return 6}



      // const collectionRef = firestore.collection('chat').orderBy('num', 'desc').limit(1);
      // const querySnapshot = await collectionRef.get();

      if (querySnapshot.docs[0].id != 1) {
        const lastnum = document.getElementById('messages').lastElementChild.getAttribute('id');
        if (lastnum != querySnapshot.docs[0].id) {
          const obj = querySnapshot.docs[0].data();
          console.log(obj)
          if (obj.media!='text') { print2(obj,'down') } else { print(obj, 'down') }

        }
      }else{
        const lastnum = document.getElementById('messages').innerHTML=``
        const obj = querySnapshot.docs[0].data();
          console.log(obj)
          if (obj.media!='text') { print2(obj,'down') } else { print(obj, 'down') }

      }




    }

async function a(){
//   const chat = firestore.collection('chat')

//   var aa = await chat.orderBy('num', 'desc').limit(1).get()

// console.log(aa.docs[0].data())

// const res = await fetch('http://localhost:8000/firestore_write',{
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({data:"jjjj"})
// });




}a()




window.bottomdist=function (){
// Get the current scroll position
let scrollPosition = window.scrollY || document.documentElement.scrollTop;

// Get the total height of the document
let documentHeight = Math.max(
  document.body.scrollHeight, document.body.offsetHeight,
  document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
);

// Calculate the distance from the current scroll position to the bottom
let distanceToBottom = documentHeight - scrollPosition - window.innerHeight;
return distanceToBottom

}
  

    // setTimeout(() => { firebase.initializeApp(firebaseConfig); }, 2000);


    
   window.gotfile=function (e) { 
      let file = e.target.files[0]
      document.getElementById('status').style.display = ''
      



      const storageRef = ref(storage,'chat/'+file.name);
      var metadata = {contentDisposition: 'attachment'};
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);


      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log(percent)


        document.getElementById('progress').style.width = percent + '%'
        document.getElementById('two').innerText = percent + '%'

      }, (err) => {
        console.log(err)
      },() => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url)
      document.getElementById('status').style.display = 'none'

          // document.getElementById('per').innerHTML=url
          // document.getElementById('parent'+index).remove()
          // console.log(document.getElementById('progress_div').childElementCount)
          dbsend(url, 'media', file);
        }).catch((err) => {
          console.log(err)
        })
      })



return 6

      firestr = firebase.storage().ref("chat/" + filename)
      var metadata = {
        contentDisposition: 'attachment'// Force download
      };
      var uploadtusk = firestr.put(fileitem, metadata)

      document.getElementById('status').style.display = ''
      document.getElementById('status').style.cssText = 'z-index:1'

      uploadtusk.on("state_changed", (snapshot) => {
        // console.log(snapshot)
        const percent = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log(percent)
        document.getElementById('progress').style.width = percent + '%'
        document.getElementById('two').innerText = percent + '%'

      }, (err) => {
        console.log(err)

      }, () => {
        uploadtusk.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url)

          // dbsend(url, '', filename);

        }).catch((err) => {
          console.log(err)
        })
      })

    }



  </script>



  <script type="module">

    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
    import {
      getDatabase, ref, onValue, remove, onChildChanged, update
    } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";


    const firebaseConfig2 = {
      apiKey: "AIzaSyA5gs25IDoaJfCE5_tI7ulE8zossMcnnkY",
      authDomain: "jsprj-b0693.firebaseapp.com",
      databaseURL: "https://jsprj-b0693-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "jsprj-b0693",
      storageBucket: "jsprj-b0693.appspot.com",
      messagingSenderId: "581883143558",
      appId: "1:581883143558:web:26fa31b2aa1b5afd19b807",
      measurementId: "G-VVQ6N17N9M"

    };
    const app2 = initializeApp(firebaseConfig2);
    const database = getDatabase(app2);

    const newMsg = ref(database, 'db/' + 'child-db-1');
    const online = ref(database, 'db/' + 'online-child-db');



    onChildChanged(newMsg, (data) => {
      console.warn(data.val())
      window.neww()
    });


    window.ws = function () {
      var con
      const time = new Date().toLocaleTimeString();
      const ran = Math.random();
      var con = time.concat(ran)
      update(ref(database, 'db/' + 'child-db-1'), { val: con });



      let count = 0
      let interval = setInterval(() => {
        count = count + 1;if (count == 30) { clearInterval(interval); }
        const time = new Date().toLocaleTimeString();
          const ran = Math.random();
          var con = time.concat(ran)
          update(ref(database, 'db/' + 'child-db-1'), { val: con });

      }, 100);

      for (let i = 1; i < 31; i++) {
        setTimeout(() => {
          const time = new Date().toLocaleTimeString();
          const ran = Math.random();
          var con = time.concat(ran)
          update(ref(database, 'db/' + 'child-db-1'), { val: con });
        }, i + '000');
        console.log(i)

      }





    }

    for (let i = 1; i < 10; i++) {
      setTimeout(() => {
        var con
        const time = new Date().toLocaleTimeString();
        const ran = Math.random();
        var con = time.concat(ran)
        update(ref(database, 'db/' + 'child-db-1'), { val: con });
      }, i * 500);

    }




  </script>

</body>

</html>
