const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit(
      "sendLocation",
      { latitude, longitude },
      () => {
        console.log("Location shared");

      },
      (Error) => {
        console.log("Error on sharing location", Error);
      },{
          enableHighAccuracy: true,
          setTimeout: 5000
      }
    );
  });
}
else {
  console.log("Geolocation is not supported by this browser");
}

function startTracking() {
    isTracking = true;
    locationStatus.textContent = 'Tracking started';
  }
  


 
 function scheduleBreak() {
      if ('scheduling' in window) {
        navigator.scheduling.scheduleTask({
          taskCallback: () => {
            breakStatus.textContent = 'Time for a break!';
            alert('Take a 10-minute break!');
          },
          delay: 30 * 60 * 1000 // 30 minutes in milliseconds
        }).then(task => {
          breakStatus.textContent = 'Taking a Break in 30 minutes';
        }).catch(err => {
          breakStatus.textContent = `Error scheduling break: ${err.message}`;
        });
      } else {
        // Fallback for browsers without Background Tasks API
        setTimeout(() => {
          breakStatus.textContent = 'Time for a break!';
          alert('Take a 10-minute break!');
        }, 30 * 60 * 1000);
        breakStatus.textContent = 'Taking a Break in 30 minutes';
      }
    }

function stopTracking() {
    isTracking = false;
    locationStatus.textContent = 'Tracking stopped';
  }

function checkNetwork() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    const type = connection.effectiveType;
    networkStatus.textContent = `Network: ${type}`;
    // Adjust map detail based on network
    if (type === '4g' || type === '3g') {
      canvas.style.imageRendering = 'auto';
    } else {
      canvas.style.imageRendering = 'pixelated'; // Lower quality for slow connections
    }
  } else {
    networkStatus.textContent = 'Network: Unknown';
  }
}

 setInterval(checkNetwork, 3000);

const map = L.map('map').setView([0, 0], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy;Aayush_Sahani'
}).addTo(map);
 


const markers = {}; 

socket.on("receiveLocation", (data) => {
  const {id,latitude ,longitude} = data;
  map.setView([latitude, longitude], 10);
  if(markers[id]){
    markers[id].setLatLng([latitude, longitude]);
  } 
  else{
    markers[id]= L.marker([latitude, longitude]).addTo(map)
  }
})
 