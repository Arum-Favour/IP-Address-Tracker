async function getLocation(){
    const getLocation = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi&domain=www.google.com");
    const result = await getLocation.json();
    console.log(result);
}
getLocation();