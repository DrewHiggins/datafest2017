function changeData(loc, month, json_data) {
  var data = [['Country', 'Number of Trips']];
  new_data = json_data[loc][month];
  for (key in new_data) {
    data.push([key, new_data[key]]);
  }
  return data;
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var data_array = [['Country', 'Num Trips']];
$(document).ready(function() {
  $.getJSON('./data_sample.json', function(res) {
    data_array = changeData("UNITED STATES OF AMERICA", "January", res);
    google.charts.load('current', {'packages':['geochart']});
    google.charts.setOnLoadCallback(drawRegionsMap);
    var options = {
      colorAxis: {maxValue: 70},
      animation:{
        duration: 1000,
        ease: 'out'
      }
    };
    var chart = null;

    function drawRegionsMap() {
      chart = new google.visualization.GeoChart(document.getElementById('map'));
      var data = google.visualization.arrayToDataTable(data_array);
      chart.draw(data, options);
    }

    $('#origin').change(function() { // update map on origin location change
      data_array = changeData($('#origin').val(), months[$('#month').val()], res);
      var data = google.visualization.arrayToDataTable(data_array);
      chart.draw(data, options);
    });
    $('#month').change(function() { // update map on month change
      data_array = changeData($('#origin').val(), months[$('#month').val()], res);
      var data = google.visualization.arrayToDataTable(data_array);
      $('#month-label').html(months[$('#month').val()]);
      chart.draw(data, options);
    });
  });
});
