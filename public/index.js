var makeRequest = function(url, callback) {
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

var populateList = function(countries) {
  var ul = document.querySelector('#country-list');
  countries.forEach(function(country) {
    var li = document.createElement('li');
    li.innerText = country.name;
    ul.appendChild(li);
  })
}

var requestComplete = function() {
  // console.log('blah');
  if (this.status !== 200) {
    return;
  }
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);
};

var url = 'https://restcountries.eu/rest/v2';

var handleButtonClick = function() {
  makeRequest(url, requestComplete);
}

var app = function() {
  // makeRequest(url, requestComplete);
  var button = document.querySelector('#populate-countries')
  button.addEventListener('click', handleButtonClick);
};

window.addEventListener('load', app);
