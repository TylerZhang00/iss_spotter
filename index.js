// index.js
const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");
// const { nextISSTimesForMyLocation } = require("./iss");

const nextISSTimesForMyLocation = function(callback) {
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
        callback(null, flyoverTimes);
        // console.log("It worked! Returned Fly Over Times:", flyoverTimes);
      });
    });
  });
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
