'use strict';


var data;
var file = 'scripts/drcsv.csv';
var selectArray = [];
var country, countryName;

Papa.parse(file, {
  download: true, header: true, complete: function (results) {
    data = results;
    for (var i = 0; i < data.data.length; i++) {
      if (selectArray.indexOf(data.data[i].Address) == -1 && data.data[i].Address != null) {
        selectArray.push(data.data[i].Address);
        country = document.createElement('OPTION');
        country.value = data.data[i].Address;
        countryName = document.createTextNode(data.data[i].Address);
        country.appendChild(countryName);
        document.getElementById('country').appendChild(country);
      }

    }
  makeHeader();
  }

});

function makeHeader(){
  var header = document.getElementById('table-headers');
  for (var l = 0; l < Object.keys(data.data[1]).length-1; l++){
    var ct = document.createElement('td');
    var el =  document.createTextNode(Object.keys(data.data[1])[l]);
    ct.appendChild(el);
    header.appendChild(ct);
  }
}

var tr, td, tdcont;
document.getElementById('country').addEventListener("change", function (evt) {
  document.getElementById('csv-table').innerHTML = "";
  console.log(typeof evt.target.value);
  for (var i = 0; i < data.data.length; i++) {
    if (evt.target.value === data.data[i].Address) {
      tr = document.createElement('tr');
      for (var t = 0; t < Object.keys(data.data[0]).length-1; t++) {
        td = document.createElement('td');
        var objKey = [Object.keys(data.data[i])[t]];
        tdcont = document.createTextNode(data.data[i][objKey]);
        td.appendChild(tdcont);
        tr.appendChild(td);
      }
      document.getElementById('csv-table').appendChild(tr);
    }
  }
});
