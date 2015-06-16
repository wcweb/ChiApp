var express= require('express');
var app = express();
var path = require('path')

var config = {
    root: path.normalize(__dirname + '/')
}

app.use(express.static(config.root));

app.get('/',function(req,res){
  res.jsonp({
    "hello":"world"
  })
});


app.get('/getlist', function(req,res){
  res.jsonp([{
    "file":"http://localhost:5000/assets/001.png"
  },{
    "zip":"http://localhost:5000/assets/001.zip"
  }])
});

app.listen(5000);
