var Express = require('express'),
    Http = require('http'),
    BodyParser = require('body-parser');

var app = Express();
var server = Http.Server(app);

server.listen(3001,'0.0.0.0',function(){
    console.log('Serveur listening on http://%s:%s', server.address().address,server.address().port);
});

app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Accept, Cache-Control, Origin, Content-Type");

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

var wishList = null;
var suggest = null;

var fakedealer = {
    "vehicles": [
        {
            "vin": "VF12R051558365753",
            "brand": "RENAULT",
            "phase": 2,
            "modelLabel": "Captur",
            "versionLabel": "Intens ENERGY TCe 90",
            "energy": "Essence",
            "vehicleType": "VP",
            "images": "https://cloudfront-media-prod-1-renault-hdbo.renault-aws.ekino.com/uci/vehicles/25a4e313-34af-102d-7a69-1a784f01cc9f/25000000043vo17067701_medium.jpg",
            "pollution": 113,
            "type": "Monospace"
        },
        {
            "vin": "VF12R071658535751",
            "brand": "RENAULT",
            "phase": 2,
            "modelLabel": "Clio",
            "versionLabel": "Iridium ENERGY dCi 110",
            "energy": "DIESEL",
            "vehicleType": "VP",
            "images": "https://cloudfront-media-prod-1-renault-hdbo.renault-aws.ekino.com/uci/vehicles/796d85d0-824f-31c5-3080-2e88eba8a47a/25000000419vo01750901_medium.jpg",
            "pollution": 98,
            "type": "Monospace"
        },
        {
            "vin": "VF12R031657351138",
            "brand": "RENAULT",
            "phase": 2,
            "modelLabel": "Megane",
            "versionLabel": "Intens ENERGY TCe 120",
            "energy": "Essence",
            "vehicleType": "VP",
            "images": "https://cloudfront-media-prod-1-renault-hdbo.renault-aws.ekino.com/uci/vehicles/5d7a1e2a-2f50-0eeb-4ef6-c949c203d01c/250000007010020947201_medium.jpg",
            "pollution": 125,
            "type": "Monospace"
        }
    ],
    "total": 3
  };
  

app.get('/wishList' , function (req, res) {
    console.log('get wishList');
    res.json(wishList);
});

app.get('/fakedealer/list' , function (req, res) {
    console.log('get fakedealer');
    res.json(fakedealer);
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