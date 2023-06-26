function fetchCities() {
  var input = document.getElementById('cityInput');
  var searchText = input.value.trim();

  // Make an AJAX request to your API endpoint
  var request = new XMLHttpRequest();
  var url = 'http://localhost:3000/api/city';
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var citiesData = JSON.parse(request.responseText);
      var dropdown = document.getElementById('cityDropdown');
      dropdown.innerHTML = '<option value="">Select a city...</option>';

      citiesData.forEach(function(cityData) {
        var cityName = cityData.city;
        if (cityName.startsWith(searchText)) {
          var option = document.createElement('option');
          option.value = cityName;
          option.textContent = cityName;
          dropdown.appendChild(option);
        }
      });
    }
  };

  request.send();
}

function displayCityInfo() {
  var selectedCity = document.getElementById('cityDropdown').value;

  // Make an AJAX request to your API endpoint to fetch the city information
  var request = new XMLHttpRequest();
  var url = 'http://localhost:3000/api/city/' + selectedCity;
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var cityInfo = JSON.parse(request.responseText);
      document.getElementById('cityRank').textContent = 'Rank: ' + cityInfo.rank;
      document.getElementById('city').textContent = 'City: ' + cityInfo.city;
      document.getElementById('cityPopulation2011').textContent = 'Population (2011): ' + cityInfo.population11;
      document.getElementById('cityPopulation2001').textContent = 'Population (2001): ' + cityInfo.population1;
      document.getElementById('cityState').textContent = 'State: ' + cityInfo.state;
    }
  };

  request.send();
}
