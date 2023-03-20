var map = L.map('map').setView([51.505, -0.09], 13);

//var map = L.map('map');
//var myRenderer = L.canvas({ padding: 1 });
//var line = L.polyline( [51.505, -0.09], { renderer: myRenderer } );
//var circle = L.circle( ([51.505, -0.09]),5000 ).addTo(map).bindPopup("hi<br>")

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup()
    
L.Control.MyControl = L.Control.extend({
    onAdd: function(map) {
      var el = L.DomUtil.create('div', 'leaflet-bar my-control');
  
      el.innerHTML = `  <div><input type="radio" id="polyline" name="age" value="30">
      <label for="polyline">polyline</label><br>
      <input type="radio" id="polygon" name="age" value="60">
      <label for="polygon">Polygon</label><br></div>`;
  
      return el;
    },
  
    onRemove: function(map) {
      // Nothing to do here
    }
  });
  
  L.control.myControl = function(opts) {
    return new L.Control.MyControl(opts);
  }
  
  L.control.myControl({
    position: 'topright'
  }).addTo(map);

// map.addEventListener("click",()=>{
//     map.flyTo([50.505,-0.1])
// })
let polyline = document.getElementById("polyline")
let polygon = document.getElementById("polygon")

let latlong = []
let counter =0
let a =0
map.on('click',(e)=>{
   // console.log(polyline.value)

    latlong.push(e.latlng)
    //console.log(latlong)
    L.polyline(latlong,{color:'red'}).addTo(map)
    if(counter>0){
        a = map.distance(latlong[counter-1],latlong[counter])+a
        console.log(a)
    }
    counter = counter +1;
    
})


