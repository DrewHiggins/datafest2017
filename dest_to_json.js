var fs = require('fs');
var csv = require('fast-csv')
var stream = fs.createReadStream("dest.txt");

dest_json = {};

var csvStream = csv.parse({delimiter: '\t'})
  .on("data", function(data) {
    dest_json[data[0]] = data[1];
  })
  .on("end", function() {
    fs.writeFile('/Users/drewhiggins/Desktop/dest.json', JSON.stringify(dest_json), function(err) {
      if (err) console.log('error writing file');
      console.log('Saved!');
    });
  });

stream.pipe(csvStream);
