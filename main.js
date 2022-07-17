var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
const path = require('path');


// 함수
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

    <!--글생성 UI 구현-->
    <a href="/create">create</a>

    ${body}
  </body>
  </html>
  `
}

function templateList(filelist){
  var i = 0;
  var list = '';
          
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
    else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){       // 리스트 동적으로 구현
        var title = 'WEB - create';

        var list = templateList(filelist);
        var template = templateHTML(title, list, `
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
           <input type="submit">
          </p>
        </form>
        `);

        response.writeHead(200);
        response.end(template);
      })
    }
    else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
          if (err) throw err;
        })
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    }
    else{
      response.writeHead(404);
      response.end('Not found');
    }
 
});
app.listen(3000);
