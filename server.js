var express = require('express');
var bodyparser = require('body-parser');
var reqIp = require('req-ip');

var app = express();
var reqip = reqIp();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended:false}));

app.get('/',function(req,res){
	//var ip = req.ip;
	var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
	var header = req.headers;
	console.log(ip);
	var lang = header['accept-language'].split(';')[0].split(',')[0];
	var software = header['user-agent'].split('(')[1].split(')')[0];
	var head = {
		"ipaddress": ip,
		"language": lang,
		"software": software
	}
	res.send(head);
	
});

app.listen(app.get('port'),function(){
	console.log('the app is running');
})