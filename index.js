const http=require('http');
const fs=require('fs');
const path=require('path');
var qs = require('querystring');

const server= http.createServer(
(req, res)=>{
// alteration
if(req.method=='POST' && req.url=='/message'){
    var body='';
    req.on('data', (data)=>{
   body+=data;
 });
 req.on('end', ()=>{
     var post=qs.parse(body);
        //write the text into file
        fs.writeFile(path.join(__dirname, "/htmlfolder", "message.txt"),  
        post.message,
              err => {
                if (err) throw err;
                res.end(`succesfully written to file`);
              });
          
 });
}
else{
    let urlpath=path.join(__dirname,
        'htmlfolder',
        req.url==='/'? 'index.html':req.url
        );
  
    //let get the extension of the url
    let ext=path.extname(urlpath);
     let contentype='text/html';

     switch(ext){
        case '.html':
            contenttype='text/html';
            break;
        case '.js':
            contenttype='text/javascript';
            break;
        case '.css':
            contenttype='text/css';
            break;
        case '.json':
            contenttype='application/json';
            break;
        case '.png':
            contenttype='image/png';
            break;
        case '.jpg':
            contenttype='image/jpg';
            break;
      }

      // let us read the file
      fs.readFile(urlpath,(err, content)=>{
          if(err){
            ///re-chech for 404 error
                if(err.code=='ENOENT'){
                    res.end('404 error, page not fund') 
                }
          }else{

            res.writeHead(200, {'Content-Tpe':contentype});
            res.end(content, 'utf8');

          }


      });
    }
    }
);

server.listen(8080, function() {
    console.log("Server running on 8080")});
