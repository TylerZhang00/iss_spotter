// index.js
const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);

  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log("It worked! Returned Lat & Long:", coordinates);

    fetchISSFlyOverTimes(coordinates, (error, flyoverTimes) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log("It worked! Returned Fly Over Times:", flyoverTimes);
    });
  });
});
