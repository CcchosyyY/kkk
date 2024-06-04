// jshint esversion: 6
//express 기본 모듈 불러오기
var express = require('express'), http=require('http'),path=require('path');

//express 미들웨어 불러오기
var static = require('serve-static');

//express 객체 생성
var app = express();
var router = express.Router();


//기본 속성 설정
app.set('port',process.env.PORT||8080);
app.set('host','127.0.0.1');

//웹 폴더에 저장된 모든 웹페이지에 대한 정적 참조 허용
app.use(static(__dirname));

app.use(express.urlencoded());
app.use(express.json());

//http 서버 생성
http.createServer(app).listen(app.get('port'), app.get('host'), () =>{
	console.log('Express server running at '+ app.get('port')+app.get('host'));
});

// app.use(function(req,res,next){
// 	console.log("첫 번째 미들웨어에서 요청을 처리함.");

// 	req.user = "mike";
// 	next();
// });

// app.get('/',function(req,res,next){
// 	console.log("두 번째 미들웨어에서 요청을 처리함.");

// 	res.writeHead("200",{"Content-Type":"text/html;charset=utf8"});
// 	res.end("<h1>바보Express 서버에서 "+req.user+" 가 응답한 결과입니다.</h1>");
// });

//실습1
router.route('/').get(function(req, res){
	res.redirect('http://localhost:8080/jQuery.html');
});

router.route('/routetest').get(function(req,res){
	res.redirect("http://www.google.com");
});

app.use('/', router);
//실습1 end

$(document).ready(function(){
	$("#getText").click(function(){
		$("textbox").text("글자 입력 테스트");
		var req = $.ajax("data.txt");
		req.done(function(data, status){
			var students = JSON.parse(data);
			for(var i=0;i<students.length;i++)
			{
				var str = students[i].name+"<br>";
				$("#textbox").append(str);
			}
		});
	});
});