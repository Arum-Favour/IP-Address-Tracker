// async function getIpAddress(domainName) {
//     const response = await fetch(`https://api.ipdata.co/?api-key=f3870cf141f444d2be83ae0aad9d71b1663bb86d9812e4230cc80971`);
//     const data = await response.json();
//     console.log(data.ip);
//     // return data.ip;
//   }
  
//   getIpAddress("www.google.com"); // Replace with the actual domain name

var request = new XMLHttpRequest();

request.open('GET', 'https://api.ipdata.co/?api-key=f3870cf141f444d2be83ae0aad9d71b1663bb86d9812e4230cc80971');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
};

request.send();