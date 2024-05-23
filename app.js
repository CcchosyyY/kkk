var express = require("express"), http = require("http");

var static = require("serve-static");

var app = express();

app.set("port",process.env.PORT||8080);
app.set("host","127.0.0.1");

app.use(static(__dirname));

http.createServer(app).listen(app.get("port"),app.get('host'),() => {
	console.log("Express server running at "+app.get('port')+app.get("host"));
});

//commit 하고 push 할거