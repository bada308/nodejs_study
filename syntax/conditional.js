// Node.js-17.JavaScript-조건문
// Node.js-18.Node.js-콘솔에서의 입력값

var args = process.argv;
console.log(args[2]);


console.log('A');
console.log('B');
if(args[2] === '1'){
    console.log('C1');
} else {
    console.log('C2');
}

console.log('D');