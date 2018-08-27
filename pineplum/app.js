var express = require('express');
var fs = require('fs');
var helmet = require('helmet');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var http = require('http');
var url = require('url');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var bodyParser = require('body-parser');


var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(helmet({
    frameguard: false
}));

app.use("/static", express.static(__dirname + "/src"));
app.use("/static", express.static(__dirname + "/node_modules"));
app.use("/static", express.static(__dirname + "/db"));
app.use("/static", express.static(__dirname + "/image"));


app.get('/', function (req, res) {

    res.sendfile('index.html');
});

app.post('/sendmail', function (req, res) {
    var transport = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: 'eorol82@gmail.com',
            pass: 'tyty135!!'
        }
    }));

    var mailOptions = {
        from: '오연주 <eorol82@gmail.com>',
        to: req.body.email,
        subject: 'PINEPLUM 주문서',
        html: '<h1>' + req.body.orderName + '님의 주문 내역입니다.</h1>' +
        '<p>' + req.body.htmlBody + '</p><hr/>' +
        '<p><b>' + '신한 은행 예금주 : 최인혜 110-366-163496로 입금 부탁드립니다.(입금자명 꼭 기재해주세요!)' + '</b></p>'
    };

    transport.sendMail(mailOptions, function (error, response) {

        if (error) {
            console.log(error);
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('500 Internal Server ' + error);
        } else {
            console.log("Message sent : " + response.message);
            res.end();
        }
        transport.close();
    });
});

app.get('/setCookie', function (req, res) {
    var query = url.parse(req.url, true, true).query;

    var item = {};

    if (query && query.name) {
        item.name = String(query.name);
    }

    if (query && query.option) {
        item.option = String(query.option);
    }

    if (query && query.price) {
        item.price = String(query.price);
    }

    if (query && query.src) {
        item.src = String(query.src);
    }

    var itemList;

    if (req.cookies.itemList) {
        itemList = JSON.parse(req.cookies.itemList);
        itemList.push(item);
    } else {
        itemList = new Array();
        itemList.push(item);
    }

    // Set a new cookie with the name
    res.cookie('itemList', JSON.stringify(itemList), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 day
    });

    res.end();
});

app.get('/getCookie', function (req, res) {

    // Parse the cookies on the request
    var cookies = cookie.parse(req.headers.cookie || '');

    if (!cookies.itemList) {
        res.end();
        return;
    }

    // Get the visitor name set in the cookie
    var itemList = JSON.parse(cookies.itemList);
    var result = {"itemList": itemList};

    res.json(result);


});

app.get('/deleteCookie', function (req, res) {
    var query = url.parse(req.url, true, true).query;
    var name = query.name;
    var option = query.option;
    // Parse the cookies on the request
    var cookies = cookie.parse(req.headers.cookie || '');

    // Get the visitor name set in the cookie
    var itemList = JSON.parse(cookies.itemList);
    var deleteIndex = -1;
    for (var i = 1; i < itemList.length; i++) {
        if (itemList[i].name == name && itemList[i].option == option) {
            deleteIndex = i;
            break;
        }
    }

    itemList.splice(deleteIndex, 1);


    // Set a new cookie with the name
    res.cookie('itemList', JSON.stringify(itemList), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 day
    });

    res.end();


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

