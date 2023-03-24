$(document).ready(function () {
    var APIkey = "&appid=ef992135dd66d3398d3044ce7657ed1e";
    var currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=";

        // Search history 
        displaySearchHistory();
    });

    // Display the search history of the user with clickable links to display the current and future weather conditions for that city
    function displaySearchHistory() {
        var cities = JSON.parse(localStorage.getItem("cities")) || [];
        $("#searched_cities_container").empty();

        for (var i = 0; i < cities.length; i++) {
            var cityLink = $("<a>").attr("href", "#").addClass("list-group-item list-group-item-action").text(cities[i]);
            $("#searched_cities_container").append(cityLink);
        }
    }
    // Attach an event listener to the search history container to handle clicks on individual city links
    $("#searched_cities_container").on("click", "a", function (event) {
        event.preventDefault();

        // Get the city name from the clicked link
        var city = $(this).text();

        // Get the current weather data for the clicked city
        $.ajax({
            url: currenturl + city + APIkey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // Update the HTML elements that display the current weather conditions with the extracted weather data
            $("#name_of_city").text(response.name);
            $("#today_temp").text("Temperature: " + response.main.temp + "°C");
            $("#today_humidity").text("Humidity: " + response.main.humidity + "%");
            $("#today_wind_speed").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#today_icon_div").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

            // Get the coordinates of the clicked city
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // Get the 5-day forecast data for the clicked city
            $.ajax({
                url: url + city + APIkey,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#daycontainer").css("display","block")
                // Update the HTML elements that display the 5-day forecast with the extracted weather data
                for (var i = 0; i < 5; i++) {
                    $("#" + i + "date").text(moment().add(i + 1, 'days').format("DD/MM/YYYY"));
                    $("#" + i + "five_day_temp").text("Temperature: " + response.list[i].main.temp + "°C");
                    $("#" + i + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity + "%");
                    $("#" + i + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                }
            });
        });
    });


$(".btn-primary").on("click",function (event) {
    event.preventDefault();

    var APIkey = "&appid=ef992135dd66d3398d3044ce7657ed1e";
    var currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var city = $("#search_bar").val().trim();
// Current weather 
        $.ajax({
            url: currenturl + city + "&units=metric" + APIkey,
            method: "GET"
        }).then(function (response) {

            // Update the HTML elements that display the current weather conditions with the extracted weather data
            $("#name_of_city").text(response.name);
            $("#today_temp").text("Temperature: " + response.main.temp + "°C");
            $("#today_wind_speed").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#today_humidity").text("Humidity: " + response.main.humidity + "%");
       
            $("#today_icon_div").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

             // Coordinates
             lat = response.coord.lat;
             lon = response.coord.lon;
             
            // Get the 5-day forecast data for the entered city
            $.ajax({
                url: url + city + "&units=metric" + APIkey,
                method: "GET"
            }).then(function (response) { console.log (response)
                // Update the HTML elements that display the 5-day forecast with the extracted weather data
                $("#daycontainer").css("display","block")
                for (var i = 0; i < 5; i++) {
                    $("#" + i + "date").text(moment().add(i + 1, 'days').format("DD/MM/YYYY"));
                    $("#" + i + "five_day_temp").text("Temperature: " + response.list[i].main.temp + "°C");
                    $("#" + i + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity + "%");
                    $("#" + i + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                }

            });
        });

    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
})