fetch('https://script.google.com/macros/s/AKfycbw4G86YsWDyrrPU8J16k6_dIjXJ89hswDWfkolDEQR4OvfbnMAMaETPEEjxT9bPwhI/exec')
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Log the entire data response to check its structure
    if (data && data.registrations) {
      data.registrations.forEach(entry => {
        console.log(entry);  // Log each entry to check its contents
      });
    } else {
      console.error('No registrations found in the response.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
