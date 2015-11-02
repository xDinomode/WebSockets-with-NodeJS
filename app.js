var fs = require("fs");
var http = require("http");
var https = require("https");
var privateKey = fs.readFileSync("./ssl/server.key", "utf8");
var certificate = fs.readFileSync("./ssl/server.crt", "utf8");

var bodyParser = require("body-parser");

var credentials = {key: privateKey, cert: certificate};
var express = require("express");
var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

var io = require("socket.io")(httpServer);

var route = require("./routes/approute.js");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));


app.use("/", route);

io.on("connection", function(socket){
        console.log("A user has connected");

        socket.on("myposition", function(pos){
            console.log("X: " + pos.x + ", Y: " + pos.y);
            socket.broadcast.emit("usersPosition", pos);
        });

        socket.on("disconnect", function(){
            console.log("a user has disconnected");
        });
});

app.use("*", function(req, res){
    res.status(404);
    res.send("404 page not found");
});

httpServer.listen(80);
httpsServer.listen(443);
