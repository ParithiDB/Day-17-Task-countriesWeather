
fetch("https://restcountries.com/v3.1/all")
   .then((response) => response.json())
   .then((json) => {
    renderRestaurantCard(json);
   })
  .catch((error) => console.log(error));


  function weatherData(country) {
    const lat = country.latlng[0];
    const lng = country.latlng[1];
    const params = 'precipitation,humidity,cloudCover,airTemperature';
    
    fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
      headers: {
        'Authorization': '963d7156-076d-11ee-a654-0242ac130002-963d728c-076d-11ee-a654-0242ac130002'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Weather data request failed.');
      }
      return response.json();
    })
    .then((jsonData) => {
      const weatherMessage = document.getElementById("weather-message");
      weatherMessage.textContent = JSON.stringify(jsonData.hours[0]);
      const popup = document.getElementById("weather-popup");
      popup.style.display = "block";

      const closeButton = document.getElementById("close-button");
      closeButton.addEventListener("click", () => {
        popup.style.display = "none";
      });

  })
    .catch((error) => {
      console.log(error);
      alert('An error occurred while fetching weather data.');
    });
  }
  




function renderRestaurantCard(data = []) {
    const cardsArray = [];
    const restaurantsListingContainer = document.getElementById(
      "country-card"
    );
    if (data.length > 0) {
      data.forEach((_d) => {
        const cardNode = document.createElement("div");
        cardNode.setAttribute(
          "class",
          "col-xl-4 col-lg-4 col-md-2 col-sm-12 col-xs-12"
        );
        cardNode.innerHTML = `
        <div class="container">
        
             <section class="container-fluid restaurants-section py-3">
                <div class="section-container"> 
                  
                     <div class="row">
                        <div class="col"> 
                        <div class="card">
                        <div class="country-name">
                            <p class="fs-3">${_d.name.common}</p>
                        </div>
                        <img src="${_d.flags.png}" 
                        height="230px"
                        
                        style="border-radius: 10px; padding: 10px; object-fit: cover;"
                        class="card-img-top" alt="${_d.name.common}">
                        <div class="card-body">
                            
                          <p>Capital : ${_d.capital}</p>
                          <p>Region : ${_d.region}</p>
                          <p>Country code : ${_d.cca3}</p>
                          <button class="btn btn-primary" id="butt" type="submit" onclick="weatherData(${JSON.stringify(_d).replace(/"/g, '&quot;')})">Click for Weather</button>

                          
                        </div>
                        </div>
                        </div>
                        
                        </div> 
                
                  
                </div>
            </section>
    </div>
        `
    cardsArray.push(cardNode);
});
restaurantsListingContainer.append(...cardsArray);
}
}



























