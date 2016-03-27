'use strict';

var file = 'scripts/drcsv.csv';



//parse the csv and create the data handler
Papa.parse(file, {
  download: true, header: true, complete: function (results) {
    var test = new AppReader(results);
  }
});


//parses data and creates headers
function AppReader(data) {
  this.parsedData = data;
  this.createHeader();
  this.countryOptions();
  this.tableUpdate();
}

//creates header based on csv
AppReader.prototype.createHeader = function () {
  var header = document.getElementById('table-headers');
  var el, ct;
  for (var l = 0; l < Object.keys(this.parsedData.data[1]).length; l++) {
    ct = document.createElement('td');
    el = document.createTextNode(Object.keys(this.parsedData.data[1])[l]);
    ct.appendChild(el);
    header.appendChild(ct);
  }
};

//provides regional drop down selection based on csv
AppReader.prototype.countryOptions = function () {
  var country, countryName;
  var selectArray = [];
  for (var i = 0; i < this.parsedData.data.length - 1; i++) {
    if (selectArray.indexOf(this.parsedData.data[i].Country) == -1) {
      console.log(this.parsedData.data[i].Country);
      selectArray.push(this.parsedData.data[i].Country);
      country = document.createElement('OPTION');
      country.value = this.parsedData.data[i].Country;
      countryName = document.createTextNode(this.parsedData.data[i].Country);
      country.appendChild(countryName);
      document.getElementById('country').appendChild(country);
    }
  }
};

//provides state selection based on csv
AppReader.prototype.stateOptions = function () {
  var state, stateName;
  var tempStateArray = [];
  document.getElementById('state').innerHTML = "";
  for (var i = 0; i < this.parsedData.data.length - 1; i++) {
    if (this.currentCountry === this.parsedData.data[i].Country) {
      if (tempStateArray.indexOf(this.parsedData.data[i]['State/Province']) == -1) {
        console.log(this.parsedData.data[i]['State/Province']);
        tempStateArray.push(this.parsedData.data[i]['State/Province']);
        state = document.createElement('OPTION');
        state.value = this.parsedData.data[i]['State/Province'];
        stateName = document.createTextNode(this.parsedData.data[i]['State/Province']);
        state.appendChild(stateName);
        document.getElementById('state').appendChild(state);
      }
    }
  }
};




AppReader.prototype.tableUpdate = function () {
  var tr, td, tdcont;
  var self = this;
  var state = document.getElementById('state');

  document.getElementById('country').addEventListener("change", function (evt) {

    document.getElementById('hide').style.display = 'block';
    self.currentCountry = evt.target.value;
    self.stateOptions();
    //Check and Add New Element
    document.getElementById('csv-table').innerHTML = "";
    for (var i = 0; i < self.parsedData.data.length; i++) {
      if (evt.target.value === self.parsedData.data[i].Country) {
        tr = document.createElement('tr');
        for (var t = 0; t < Object.keys(self.parsedData.data[0]).length; t++) {
          td = document.createElement('td');
          var objKey = [Object.keys(self.parsedData.data[i])[t]];
          tdcont = document.createTextNode(self.parsedData.data[i][objKey]);
          td.appendChild(tdcont);
          tr.appendChild(td);
        }
        document.getElementById('csv-table').appendChild(tr);
      }
    }
  });

  document.getElementById('state').addEventListener("change", function (evt) {
    //Check and Add New Element
    document.getElementById('csv-table').innerHTML = "";
    for (var i = 0; i < self.parsedData.data.length; i++) {
      if (self.currentCountry === self.parsedData.data[i].Country) {
        console.log(self.parsedData.data[i]['State/Province']);
        if (evt.target.value === self.parsedData.data[i]['State/Province']) {
          tr = document.createElement('tr');
          for (var t = 0; t < Object.keys(self.parsedData.data[0]).length; t++) {
            td = document.createElement('td');
            var objKey = [Object.keys(self.parsedData.data[i])[t]];
            tdcont = document.createTextNode(self.parsedData.data[i][objKey]);
            td.appendChild(tdcont);
            tr.appendChild(td);
          }
          document.getElementById('csv-table').appendChild(tr);
        }
      }
    }
  });

};
