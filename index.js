let map;
let myIcon;
let marker;
let Ip_address;
let domain_name;
let latitude;
let longitude;
let cordinates;
let Ipresult = document.querySelector (".Ipresult");
let ipLocation = document.querySelector(".Loc_result");
let timeResult = document.querySelector(".time_result");
let ispResult = document.querySelector(".ispresult");

displayIp();

//CODE THAT DISPLAYS THE IP ADDRESS DETAILS AND MAP ON LOAD
async function displayIp() {
  const targetUrl = "https://geo.ipify.org/api/v2/country,city?apiKey=at_75vDpArHsmgtf7msf53N67iLkRnt4&ipAddress";

  const getLocation = await fetch(targetUrl);
  const result = await getLocation.json();
  Ipresult.innerHTML = result.ip;
  ipLocation.innerHTML = result.location.region + "," + result.location.country;
  timeResult.innerHTML = "UTC " + result.location.timezone;
  ispResult.innerHTML = result.isp;
  longitude = result.location.lng;
  latitude = result.location.lat;
  console.log(longitude, latitude);

  map = L.map("map").setView([latitude, longitude], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  myIcon = L.icon({
    iconUrl: "images/icon-location.svg",
    iconSize: [35, 45],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(map);
}

//CODE TO GET LOCATION AND IP ADRESS DETAILS OF SEARCH
async function updateMapLocation() {
  let Input_text = document.querySelector("input");
  let regex = /www\..*\.com/i;
  let anotherRegex = /\.com/i;

  //CODE TO DECIDE WHETHER A DOMAIN NAME OR IP ADDRESS WAS ENTERED AS INPUT
  if (Input_text.value.match(regex) || Input_text.value.match(anotherRegex)) {
    domain_name = Input_text.value;
    const getLocation = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_75vDpArHsmgtf7msf53N67iLkRnt4&domain=${domain_name}
      `
    );
    const result = await getLocation.json();

    Ipresult.innerHTML = result.ip;
    ipLocation.innerHTML = result.location.region + "," + result.location.country;
    timeResult.innerHTML = "UTC " + result.location.timezone;
    ispResult.innerHTML = result.isp;
    longitude = result.location.lng;
    latitude = result.location.lat;
    console.log(result);

    if (map) {
      map.off();
      map.remove();
    }
    map = L.map("map").setView([latitude, longitude], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    marker = L.marker([latitude, longitude]).addTo(map);
    marker.style.backgroundColor = "black";
  } else {
    Ip_address = Input_text.value;
    const getLocation = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_75vDpArHsmgtf7msf53N67iLkRnt4&ipAddress`);
    const result = await getLocation.json();
    Ipresult.innerHTML = result.ip;
    ipLocation.innerHTML = result.location.region + "," + result.location.country;
    timeResult.innerHTML = "UTC " + result.location.timezone;
    ispResult.innerHTML = result.isp;
    longitude = result.location.lng;
    latitude = result.location.lat;

    if (map) {
      map.off();
      map.remove();
    }
    map = L.map("map").setView([latitude, longitude], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    marker = L.marker([latitude, longitude]).addTo(map);
  }
}
