var map;
var Input_text = document.querySelector("input");
var Ip_address;
var domain_name;
var Ipresult = document.querySelector(".Ipresult");
var ipLocation = document.querySelector(".Loc_result");
var timeResult = document.querySelector(".time_result");
var ispResult = document.querySelector(".ispresult");

async function getLocation() {
  let regex = /www\..*\.com/i;
  let anotherRegex = /\.com/i;

  //CODE TO DECIDE WHETHER A DOMAIN NAME OR IP ADDRESS WAS ENTERED AS INPUT
  if (Input_text.value.match(regex) || Input_text.value.match(anotherRegex)) {
    document.body.onload = "";
    domain_name = Input_text.value;
    const getLocation = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi&domain=${domain_name}`
    );
    const result = await getLocation.json();
    Ipresult.innerHTML = result.ip;
    ipLocation.innerHTML = result.location.region + "," + result.location.city;
    timeResult.innerHTML = "UTC " + result.location.timezone;
    ispResult.innerHTML = result.isp;
    let longitude = result.location.lng;
    let latitude = result.location.lat;

    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    map = L.map("map").setView([latitude, longitude], 13);
    map.dragging.enable();
    
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var marker = L.marker([latitude, longitude]).addTo(map);
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

async function displayIpMap() {
  //CODE TO DISPLAY IP ADDRESS DETAILS AND MAP OF VIEWER BY DEFAULT
  const getLocation = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi`
  );
  const result = await getLocation.json();
  Ipresult.innerHTML = result.ip;
  ipLocation.innerHTML = result.location.region + "," + result.location.city;
  timeResult.innerHTML = "UTC " + result.location.timezone;
  ispResult.innerHTML = result.isp;

  let longitude = result.location.lng;
  let latitude = result.location.lat;
  console.log(longitude, latitude);

  map = L.map("map").setView([latitude, longitude], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var circle = L.circle([longitude, latitude], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);

  var marker = L.marker([latitude, longitude]).addTo(map);
}
