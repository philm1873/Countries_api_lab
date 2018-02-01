var makeRequest = function(url, callback) {
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

var getCountries = function() {
  jsonString = localStorage.getItem('countries');
  countries = JSON.parse(jsonString);
  return countries;
}

var getCountryByAlphaCode = function(alphaCode) {
  countries = getCountries();
  var countryArray = countries.filter(country => country.alpha3Code === alphaCode)
  return countryArray[0];
}

var getNeighbouringCountries = function(country) {
  var neighbouringCountries = country.borders;
  var neighbouringCountriesArray = [];
  neighbouringCountries.forEach(function(countryCode) {
    var country = getCountryByAlphaCode(countryCode);
    neighbouringCountriesArray.push(country);
  })
  return neighbouringCountriesArray;
}

var displayNeighbouringCountriesInfo = function(array) {
  container = document.querySelector('#neighbouring-countries');
  container.innerHTML = ""
  var p = document.createElement('p');
  p.innerText = "Neighbours";
  container.appendChild(p);
  array.forEach(function(country) {
    var ul = document.createElement('ul');
    container.appendChild(ul);
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li');
    li1.innerText = "Name: " + country.name;
    li2.innerText = "Population: " + country.population;
    li3.innerText = "Capital City: " + country.capital;
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
  })
}

var displayInfo = function(){
  countries = getCountries();
  country = countries[this.value];
  var ul = document.querySelector('#country-info');
  ul.innerHTML = ""
  var li1 = document.createElement('li');
  var li2 = document.createElement('li');
  var li3 = document.createElement('li');
  li1.innerText = "Name: " + country.name;
  li2.innerText = "Population: " + country.population;
  li3.innerText = "Capital City: " + country.capital;
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  array = getNeighbouringCountries(country);
  displayNeighbouringCountriesInfo(array);
  jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString);
}

var populateSelectBox = function(countries) {
  var selectBox = document.querySelector('#countries-dropdown');
  countries.forEach(function(country, index) {
    var option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    selectBox.appendChild(option);
  })
}

var requestComplete = function() {
  // console.log('blah');
  if (this.status !== 200) {
    return;
  }
  localStorage.setItem('countries', this.responseText)
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  // populateList(countries);
  populateSelectBox(countries);
};


// var handleButtonClick = function() {
//   makeRequest(url, requestComplete);
// }

var app = function() {
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);
  var selection = document.querySelector('#countries-dropdown');
  selection.addEventListener('change', displayInfo);
};

window.addEventListener('load', app);
