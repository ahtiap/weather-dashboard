// DEPENDECIES=============================
var city = $("#search-input");
var searchBtn = $("#search-btn");
var searchHist = $("#search-history");
var cityWeath = $("#city-weath");
var cityFor = $("#forecast");
var curCity = $("#cur-city");
var tempEl = $("#temp");
var humEl = $("#hum");
var windEl = $("#wind");
var uvEl = $("#uv");
var fahr = $("#fahr");
var APIKey = "ca5f43cc4601dca5509d6c78b604147e";
var curDate = moment(new Date());

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
searchBtn.click(function (e) {
  // THEN I am presented with current and future conditions for that city and that city is added to the search history
  currentCity = city.val();
  if (!currentCity) {
    console.log("no");
  } else {
    // add city to search history
    var li = $("<li>");
    li.text(currentCity);
    searchHist.append(li);
    // get the current weather data

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "&appid=" +
      APIKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // WHEN I view current weather conditions for that city
      // THEN I am presented with the city name, the date, an icon representation of weather
      // conditions, the temperature, the humidity, the wind speed, and the UV index
      // add date and current city and cloud icon
      var icon;
      curCity.text(currentCity + "(" + curDate.format("MM/DD/YYYY") + ")");
      // add temperature=========================================
      var currentTemp = (((response.main.temp - 273.15) * 9) / 5 + 32).toFixed(
        1
      );
      tempEl.text("Temperature: " + currentTemp);
      fahr.css("display", "block");
      // display humidity
      var hum;
      hum = response.main.humidity;
      humEl.text("Humidity: " + hum + "%");
      // display wind speed=========================
      var wind = response.wind.speed.toFixed(1);
      windEl.text("Wind speed: " + wind + " MPH");
      // get the uv index from its own api and display it
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      var uvURL =
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;
      //console.log("uvURL:", uvURL);
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (uvRes) {
        // WHEN I view the UV index

        var uvIndex = uvRes.value;
        // THEN I am presented with a color that indicates whether the conditions are
        // favorable, moderate, or severe
        if (uvIndex < 5) {
          uvEl.css("background-color", "green");
        } else if (uvIndex > 5 && uvIndex < 7.5) {
          uvEl.css("background-color", "orange");
        } else {
          uvEl.css("background-color", "red");
        }
        uvEl.text("UV Index: " + uvIndex);
      });
      var castURL =
        "http://api.openweathermap.org/data/2.5/forecast?q=london&appid=" +
        APIKey;
      console.log("castURL:", castURL);
      $.ajax({
        url: castURL,
        method: "GET",
      }).then(function (castRes) {
        // WHEN I view the UV index
        console.log(castRes);
        var castArr = castRes.list;
        console.log(castArr);
        var index = 1;
        for (let i = 0; i < castArr.length; i=i+8) {
          
          var listEl = castArr[i];
        
          var castDate = moment(listEl.dt_txt);
            $("#card-date" + index).text(castDate.format("MM/DD/YYYY"));
            $("#card-temp" + index).text("Temperature: "+listEl.main.temp);
            $("#card-hum" + index).text("Humidity: "+listEl.main.humidity+"%");
          index++;
        }
      });
    });
  }

  // WHEN I view future weather conditions for that city
  // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  // WHEN I click on a city in the search history
  // THEN I am again presented with current and future conditions for that city
  // WHEN I open the weather dashboard
  // THEN I am presented with the last searched city forecast
});
