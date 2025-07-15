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

const map = L.map('map').setView([0, 0], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy;Aayush_Sahani'
}).addTo(map);
var marker = L.marker([0, 0]).addTo(map);
 
    

 function scheduleBreak() {
      if ('scheduling' in window) {
        navigator.scheduling.scheduleTask({
          taskCallback: () => {
            breakStatus.textContent = 'Time for a break!';
            alert('Take a 10-minute break!');
          },
          delay: 30 * 60 * 1000 // 30 minutes in milliseconds
        }).then(task => {
          breakStatus.textContent = 'Break scheduled in 30 minutes';
        }).catch(err => {
          breakStatus.textContent = `Error scheduling break: ${err.message}`;
        });
      } else {
        // Fallback for browsers without Background Tasks API
        setTimeout(() => {
          breakStatus.textContent = 'Time for a break!';
          alert('Take a 10-minute break!');
        }, 30 * 60 * 1000);
        breakStatus.textContent = 'Break scheduled in 30 minutes (fallback)';
      }
    }

 
 
marker.bindPopup("<b>Hi there!</b><br>I am here").openPopup();
 
