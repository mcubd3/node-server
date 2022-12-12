self.addEventListener('sync',
function (e){
if(e.tag=='foo'){
e.waitUntil(doo())
}

}
)

self.addEventListener('periodicsync',
function (e){
if(e.tag=='foo'){
e.waitUntil(doo())
}

}
)


function doo (){
  var count=0
  count=count+1
  console.log(count)
  fetch('http://localhost:8000/pj', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:count
  })


}



self.addEventListener('push',
function (e){
e.waitUntil(
  self.registration.showNotification(
    'hola!!'
  )
)

})







