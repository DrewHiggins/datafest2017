$(document).ready(function() {
  $.getJSON('./data.json', function(res) {
    google.charts.load('current', {'packages':['sankey']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Bookings');
        data.addRows(res);
        // Sets chart options.
        var options = {height: 2100};

        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.Sankey(document.getElementById('sankey'));
        chart.draw(data, options);
      }
    });
  });
