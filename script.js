$(document).ready(function () {
    var APIkey = "&appid=d797d3b4dda1d3b740beee56c7305317";
    var currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var lat;
    var lon;

    // Handle form submission
    $("form").submit(function (event) {
        event.preventDefault();
        var city = $("#search_bar").val().trim();

        // Store the entered city in local storage
        var cities = JSON.parse(localStorage.getItem("cities")) || [];
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));

        // Display the search history of the user
        displaySearchHistory();

        // Get the current weather data for the entered city
        $.ajax({
            url: currenturl + city + "&units=imperial" + APIkey,
            method: "GET"
        }).then(function (response) {
            // Get the coordinates of the entered city
            lat = response.coord.lat;
            lon = response.coord.lon;

            // Update the HTML elements that display the current weather conditions with the extracted weather data
            $("#name_of_city").text(response.name);
            $("#today_temp").text("Temperature: " + response.main.temp + "F");
            $("#today_humidity").text("Humidity: " + response.main.humidity + "%");
            $("#today_wind_speed").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#today_icon_div").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

            // Get the 5-day forecast data for the entered city
            $.ajax({
                url: url + city + "&units=imperial" + APIkey,
                method: "GET"
            }).then(function (response) {
                // Update the HTML elements that display the 5-day forecast with the extracted weather data
                for (var i = 0; i < 5; i++) {
                    $("#" + i + "date").text(moment().add(i + 1, 'days').format("MM/DD/YYYY"));
                    $("#" + i + "five_day_temp").text("Temperature: " + response.list[i].main.temp + "F");
                    $("#" + i + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity + "%");
                    $("#" + i + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                }





            });
        });
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
            $("#today_temp").text("Temperature: " + response.main.temp + "°F");
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
                // Update the HTML elements that display the 5-day forecast with the extracted weather data
                for (var i = 0; i < 5; i++) {
                    $("#" + i + "date").text(moment().add(i + 1, 'days').format("MM/DD/YYYY"));
                    $("#" + i + "five_day_temp").text("Temperature: " + response.list[i].main.temp + "°F");
                    $("#" + i + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity + "%");
                    $("#" + i + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                }
            });
        });
    });
})

