// Define the domain name
const domainName = 'www.google.com';

// Construct the API request URL
const url = `https://api.ipify.org/v1?format=json&domain=${domainName}`;

// Send the API request
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Extract the IP address
        const ipAddress = data.ip;
        
        // Print the IP address
        console.log(`The IP address of ${domainName} is: ${ipAddress}`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
