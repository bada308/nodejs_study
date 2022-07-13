var http = require('http');
var fs = require('fs');
var url = require('url');
const path = require('path');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `
}

function templateList(filelist){
  var i = 0;
          
  while(i < filelist.length){
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    i = i + 1;
  }

  list += '</ul>';

  return list;
}


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;


    if(pathname === '/'){         //Not found 오류 처리
      if(title === undefined){    // Home에 대한 처리
        

        fs.readdir('./data', function(error, filelist){       // 리스트 동적으로 구현
          var title = 'Welcome';
          var description = "Hello, Node.js";

          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);

          response.writeHead(200);
          response.end(template);
        })

        
      }
      else{
        fs.readFile(`data/${title}`, 'utf-8', function(err, description){
          fs.readdir('./data', function(error, filelist){
  
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
  
            response.writeHead(200);
            response.end(template);
          })
        })
      }
      
    } 
    else{
      response.writeHead(404);
      response.end('Not found');
    }
 
});
app.listen(3000);
