var makeRequest = function(url, callback) {
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

// var populateList = function(countries) {
//   var ul = document.querySelector('#country-list');
//   countries.forEach(function(country) {
//     var li = document.createElement('li');
//     li.innerText = country.name;
//     ul.appendChild(li);
//   })
// }

var populateSelectBox = function(countries) {
  var selectBox = document.querySelector('#countries-dropdown');
  countries.forEach(function(country) {
    var option = document.createElement('option');
    option.innerText = country.name;
    selectBox.appendChild(option);
  })
}

var requestComplete = function() {
  // console.log('blah');
  if (this.status !== 200) {
    return;
  }
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
};

window.addEventListener('load', app);
