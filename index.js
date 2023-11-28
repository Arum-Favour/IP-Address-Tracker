alert("The App Just Began")
async function getLocation() {
  let Input_text = document.querySelector("input");
  let Ip_address;
  let domain_name;
  let regex = "www..*.com";

  if (Input_text.value.match(regex)) {
    domain_name = Input_text;
    const getLocation = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi&domain= ${domain_name}`
    );
    const result = await getLocation.json();
  }else{
    Ip_address=Input_text;
    const getLocation = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_3fejZuvyag7r3eetqnNtHM3ApC2Xi&ipAddress= ${Ip_address}`
      );
      const result = await getLocation.json();
  }

  console.log(result);
}
getLocation();
