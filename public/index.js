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

var displayInfo = function(){
  var country = countries[this.value];
  var ul = document.querySelector('#country-info');
  ul.innerHTML = ""
  var li1 = document.createElement('li');
  var li2 = document.createElement('li');
  var li3 = document.createElement('li');
  li1.innerText = country.name;
  li2.innerText = country.population;
  li3.innerText = country.capital;
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
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
  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
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
