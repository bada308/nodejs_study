// Node.js-28.2.JavaScript-동기와 비동기 2


var fs = require('fs');


/*
// readFileSync

console.log('A')
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

console.log('A')
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');