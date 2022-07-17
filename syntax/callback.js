// Node.js-28.3.JavaScript-callback

/*
function a(){
    console.log('A');
}
*/

// JS에서는 함수가 값임

var a = function(){
    console.log('A');
}

function slowFunc(callback){
    callback();
}

slowFunc(a);