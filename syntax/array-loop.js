// Node.js-23.JavaScript-배열과 반복문

var number = [1, 400, 12, 34, 5];
var i = 0;
var sum = 0;

while(i < number.length){
    sum += number[i];
    i = i + 1;
}

console.log(`sum : ${sum}`);