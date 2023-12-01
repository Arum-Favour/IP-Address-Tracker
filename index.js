let map;
let Ip_address;
let domain_name;
let latitude;
let longitude;
let marker;
let Input_text = document.querySelector("input");
let Ipresult = document.querySelector(".Ipresult");
let ipLocation = document.querySelector(".Loc_result");
let timeResult = document.querySelector(".time_result");
let ispResult = document.querySelector(".ispresult");

function initMap() {
  map = L.map("map").setView([latitude, longitude], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

function addMarker(latitude, longitude) {
  marker = L.marker([latitude, longitude]).addTo(map);
  return marker;
}

function updateMarker(marker, latitude, longitude) {
  marker.setLatLng([latitude, longitude]);
  // return marker
}

//CODE THAT DISPLAYS THE IP ADDRESS DETAILS AND MAP AT LOAD
async function displayIpMap() {
  const getLocation = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi`
  );
  const result = await getLocation.json();
  Ipresult.innerHTML = result.ip;
  ipLocation.innerHTML = result.location.region + "," + result.location.city;
  timeResult.innerHTML = "UTC " + result.location.timezone;
  ispResult.innerHTML = result.isp;
  longitude = result.location.lng;
  latitude = result.location.lat;
  console.log(longitude, latitude);

  if (!map) {
    initMap();
  }
}

//CODE TO GET LOCATION AND IP ADRESS DETAILS OF SEARCH
async function getLocation() {
  let regex = /www\..*\.com/i;
  let anotherRegex = /\.com/i;

  //CODE TO DECIDE WHETHER A DOMAIN NAME OR IP ADDRESS WAS ENTERED AS INPUT
  if (Input_text.value.match(regex) || Input_text.value.match(anotherRegex)) {
    domain_name = Input_text.value;
    const getLocation = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi&domain=${domain_name}`
    );
    const result = await getLocation.json();
    Ipresult.innerHTML = result.ip;
    ipLocation.innerHTML = result.location.region + "," + result.location.city;
    timeResult.innerHTML = "UTC " + result.location.timezone;
    ispResult.innerHTML = result.isp;
    longitude = result.location.lng;
    latitude = result.location.lat;

    if (!map) {
      initMap();
    }

        
  } else {
    Ip_address = Input_text.value;
    const getLocation = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi&ipAddress=${Ip_address}`
    );
    const result = await getLocation.json();
    Ipresult.innerHTML = result.ip;
    ipLocation.innerHTML = result.location.region;
    timeResult.innerHTML = "UTC " + result.location.timezone;
    ispResult.innerHTML = result.isp;
    console.log(Ip_address);

    let longitude = result.location.lng;
    let latitude = result.location.lat;
    console.log(longitude, latitude);

    var map = L.map("map").setView([latitude, longitude], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var marker = L.marker([latitude, longitude]).addTo(map);
  }
}
