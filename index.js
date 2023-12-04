let map;
let marker;
let Ip_address;
let domain_name;
let latitude;
let longitude;
let Ipresult = document.querySelector(".Ipresult");
let ipLocation = document.querySelector(".Loc_result");
let timeResult = document.querySelector(".time_result");
let ispResult = document.querySelector(".ispresult");

displayIp();

//CODE THAT DISPLAYS THE IP ADDRESS DETAILS AND MAP AT LOAD
async function displayIp() {
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

  map = L.map("map").setView([latitude, longitude], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  marker = L.marker([latitude, longitude]).addTo(map);
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
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi&domain=${domain_name}`
    );
    const result = await getLocation.json();

    Ipresult.innerHTML = result.ip;
    ipLocation.innerHTML = result.location.region + "," + result.location.city;
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

    // var map = L.map("map").setView([latitude, longitude], 13);
    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   maxZoom: 19,
    //   attribution:
    //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    // }).addTo(map);

    // var marker = L.marker([latitude, longitude]).addTo(map);
  }
}
