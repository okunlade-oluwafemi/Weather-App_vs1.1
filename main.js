window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
            (position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const api = `https://api.weatherapi.com/v1/current.json?key=23d940e181054ddf94b200450231009&q=Kogi Nigeria&aqi=yes${lat},${long}`;

                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        const { temp_f, cloud, icon } = data.current;

                        //Set DOM Elements from the API
                        temperatureDegree.textContent = temp_f;
                        temperatureDescription.textContent = cloud;
                        locationTimezone.textContent = long;
                        
                        //FORMULA FOR CELSIUS
                        let celsius = (temperature = 32) * (5 / 9);

                        //CHANGE TEMPERATURE TO CELSIUS/FERENHEIT
                        temperatureSection.addEventListener('click', () => {
                            if (temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "c";
                                temperatureDegree.textContent = Math.floor(celsius);
                            } else {
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = temperature;
                            }
                        });
                    });
            });
    }
});