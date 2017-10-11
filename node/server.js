var Express = require('express'),
    Http = require('http'),
    BodyParser = require('body-parser');

var app = Express();
var server = Http.Server(app);

server.listen(3001,'localhost',function(){
    console.log('Serveur listening on http://%s:%s', server.address().address,server.address().port);
});

app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());

var wishList = null;
var suggest = null;

app.get('/wishList' , function (req, res) {
    console.log('get wishList');
    res.json(wishList);
});

app.post('/wishList', function (req, res) {
    console.log('post wishList');
    console.log(req.body);
    wishList = req.body;
    res.json();
});

app.get('/suggest' , function (req, res) {
    console.log('get suggest');
    res.json(suggest);
});

app.post('/suggest', function (req, res) {
    console.log('post suggest');
    console.log(req.body);
    suggest = req.body;
    res.json();
});