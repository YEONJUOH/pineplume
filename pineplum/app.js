var express = require('express');
var fs = require('fs');
var helmet = require('helmet');
var app = express();

app.use(helmet({
    frameguard: false
}));

app.use("/static", express.static(__dirname + "/src"));
app.use("/static", express.static(__dirname + "/node_modules"));
app.use("/static", express.static(__dirname + "/db"));

app.get('/', function (req, res) {

    res.sendfile('index.html');
});

app.get('/image/*', function (req, res) {
    var resource = req.url;
    if (resource.indexOf('/image/') == 0) {
        var imgPath = resource.substring(1);
        fs.readFile(imgPath, function (error, data) {
            if (error) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('500 Internal Server ' + error);
            } else {
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404 Page Not Found');
    }
    ;
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

