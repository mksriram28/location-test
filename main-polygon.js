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

L.Control.CustomDrawGeomentryTools = L.Control.extend({
  onAdd: (map)=>{
    var div = L.DomUtil.create('button','draw-polygon');
    div.innerHTML = 'Click to Draw Polygon'
    L.DomEvent.on(div, 'click',(e)=>{
      L.DomEvent.stopPropagation(e);
      let drawPolygonToggle = div.classList.toggle('draw-polygon-active')
      if(drawPolygonToggle){drawPolygon();}
    })
    return div
  }
})

L.control.customdrawgeomentrytools = (opts)=>{
  return new L.Control.CustomDrawGeomentryTools(opts)
}

L.control.customdrawgeomentrytools({position:"topleft"}).addTo(map);

function drawPolygon(){
  map.on('click',(e)=>{
    let latlng = e.latlng;
    polygon.addLatLng(latlng)
  })  
}
var polygon = L.polygon([],{color:'red'}).addTo(map);
var Masterpolygon = L.polygon([],{color:'blue'}).addTo(map);


let masterPolygonCoordinate = []
map.on("dblclick",(e)=>{
  let clickedAllCoordinates = polygon.getLatLngs()
  let clickedAllCoordinatesExceptTheLastOne = [clickedAllCoordinates[0].slice(0, clickedAllCoordinates[0].length-1)]
  //map.removeLayer(polygon)
  L.polygon([clickedAllCoordinatesExceptTheLastOne],{color:'blue'}).addTo(map)
  polygon.setLatLngs([])
  map.off('click')
  let drawPolygonButton = document.querySelector(".draw-polygon-active")
  L.DomUtil.removeClass(drawPolygonButton,'draw-polygon-active')
})