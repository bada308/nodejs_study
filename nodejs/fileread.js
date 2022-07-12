var fs = require('fs');

fs.readFile('C:/Users/gang4/OneDrive/바탕 화면/opentutorial_nodejs/nodejs/sample.txt', 'utf-8', function(err, data){
    if (err) throw err;
    console.log(data);
});