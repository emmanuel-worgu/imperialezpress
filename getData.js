function getData() {
    try {
      const docs = sessionStorage.getItem('doc');
  
      const doc = JSON.parse(docs);
      const data = doc.data


      const apiKey = 'b7bf0e8301cc47708363dc9a36676c8c'; // Replace with your API key
      const location = data.currDest; // The location you want to convert

      async function getCoordinates() {
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

          try {
              const response = await fetch(apiUrl);
              if (!response.ok) {
                  throw new Error(`Error: ${response.status} - ${response.statusText}`);
              }
              
              const data = await response.json();
              if (data.results.length > 0) {
                  const { lat, lng } = data.results[0].geometry;
                  console.log(`Coordinates for ${location}: Latitude: ${lat}, Longitude: ${lng}`);
                  localStorage.setItem('lat', lat);
                  localStorage.setItem('lng', lng);
              } else {
                  console.log('No results found for the given location.');
              }
          } catch (error) {
              console.error('Error fetching coordinates:', error);
          }
      }

      // Call the function to get the coordinates
      getCoordinates();

  
      document.getElementById('track-input').value = data.trackNumber;
      document.getElementById('tr_code').textContent = data.trackNumber;
      document.getElementById('shippername').textContent = data.shipperName;
      document.getElementById('shipperemail').textContent = data.shipperEmail;
      document.getElementById('shipperadd').textContent = data.shipperAdd;
      document.getElementById('shippertel').textContent = data.shipperTel
      document.getElementById('recname').textContent = data.recieverName;
      document.getElementById('recemail').textContent = data.recieverEmail;
      document.getElementById('recadd').textContent = data.recieverAdd;
      document.getElementById('rectel').textContent = data.recieverTel;
      document.getElementById('origin').textContent = data.origin;
      document.getElementById('shiptype').textContent = data.packageType;
      document.getElementById('status').textContent = data.shipStatus;
      document.getElementById('dest').textContent = data.dest;
      document.getElementById('currDest').textContent = data.currDest;
      document.getElementById('shipment').textContent = data.shipType;
      document.getElementById('weight').textContent = `${data.wght}Kg`;
      document.getElementById('pay').textContent = data.payMode;
      document.getElementById('edd').textContent = data.deliveryDate;
      document.getElementById('dt').textContent = data.departureTime;
      document.getElementById('pd').textContent = data.pickupDate;
      document.getElementById('pt').textContent = data.pickupTime;
      document.getElementById('comment').textContent = data.comment;
  
      const hdBg = document.getElementById('result-status-header')
  
      if (data.shipStatus === 'held') {
        hdBg.style.backgroundColor = 'red'
        hdBg.style.fontWeight = 900
        return hdBg.textContent = 'ON HOLD';
      }
  
      hdBg.style.backgroundColor = 'green'
      hdBg.style.fontWeight = 900
      return hdBg.textContent = 'IN TRANSIT';
    } catch (error) {
      console.log(error);
    }
  }
  
  getData();