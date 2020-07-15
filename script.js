// DEPENDECIES=============================
var city = $("#search-input");
var searchBtn = $("#search-btn");
var searchHist = $("#search-history");
var cityWeath = $("#city-weath");
var cityFor = $("#forecast");
var curCity = $("#cur-city");
var APIKey = "b266c5e020d19bbcc629087e8167fb6c";
var curDate = moment(new Date());
curDate.format("dddd, MMMM DD.");
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
      // add date and current city and cloud icon
      var icon;
      curCity.text(currentCity + "(" + curDate.format("MM/DD/YYYY") + ")");

      var currentTemp;
      var hum;
      var wind;
      var uvIndex;
      // WHEN I view current weather conditions for that city
      // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

      // get the temperature and display it
      console.log(response);
      currentTemp = (((response.main.temp - 273.15) * 9) / 5 + 32).toFixed(1);
    });
  }

  // WHEN I view the UV index
  // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
  // WHEN I view future weather conditions for that city
  // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  // WHEN I click on a city in the search history
  // THEN I am again presented with current and future conditions for that city
  // WHEN I open the weather dashboard
  // THEN I am presented with the last searched city forecast
});
