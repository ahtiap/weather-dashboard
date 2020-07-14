// DEPENDECIES=============================
var city = $("#search-input");
var searchBtn = $("#search-btn");
var searchHist = $("#search-history");
var cityWeath = $("#city-weath");
var cityFor = $("#forecast");
var APIKey = "b266c5e020d19bbcc629087e8167fb6c";

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
searchBtn.click(function (e) {
  // THEN I am presented with current and future conditions for that city and that city is added to the search history
  currentCity = city.val();
  if (!currentCity) {
    console.log("no");
  } else {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "&appid=" +
      APIKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  }
  // WHEN I view current weather conditions for that city
  // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
  // WHEN I view the UV index
  // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
  // WHEN I view future weather conditions for that city
  // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  // WHEN I click on a city in the search history
  // THEN I am again presented with current and future conditions for that city
  // WHEN I open the weather dashboard
  // THEN I am presented with the last searched city forecast
});
