var mapreduce = require('mapred')();
var fs = require('fs');
var csv = require('fast-csv')
var stream = fs.createReadStream("origins_big.csv");

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var information = [];
var dests = JSON.parse(fs.readFileSync('/Users/drewhiggins/Desktop/dest.json', 'utf8'));

var csvStream = csv()
  .on("data", function(data){
    origin_city = data[2];
    month = months[(new Date(data[1])).getMonth()];
    destination_city = data[3];
    dest = dests[destination_city];
    if (dest) {
      dest_arr = dest.split(',');
      dest = dest_arr[dest_arr.length-1].split('(')[0].trim();
      information.push([origin_city, dest]);
    }
  })
  .on("end", function() {

    var map = function(key, value){
      var list = [], aux = {};
      aux[[key, value.toString()].toString()] = (aux[[key, value.toString()].toString()] || 0) + 1;
      for(var k in aux){
        list.push([k, aux[k]]);
      }
      return list;
    };

    var reduce = function(key, values){
      var sum = 0;
      values.forEach(function(e){
        sum += e;
      });
      return sum;
    };

    mapreduce(information, map, reduce, function(result){
      table = [];
      for (let k of Object.keys(result)) {
        v = k.split(',');
        origin = v[0];
        dest = v[1];
        if (dest == "UK") {
          dest = "United Kingdom";
        }
        if (dest !== "USA" && dest !== "United States of America" && dest !== "United States") {
          allowedOrigins = ["NEW YORK", "CHICAGO", "SEATTLE", "HOUSTON", "LOS ANGELES"];
          if (result[k] > 25 && allowedOrigins.indexOf(origin) > -1) {
            table.push([origin, dest, result[k]]);
          }
        }
      }
      fs.writeFile('mr_output2.json', JSON.stringify(table, null, 2), function(err) {
        if (err) {
          console.error('Error writing to file');
        }
        console.log('Wrote to file!');
      });
    });
  });

stream.pipe(csvStream);
