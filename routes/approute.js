var express = require("express");
var router = express.Router();
var validator = require("validator");

router.get("/", function(req, res){
    res.render("index", {test: "My Website"});
});

router.get("/signup", function(req, res){
    res.render("signup", {test: "test"});
});

router.post("/post", function(req, res){
    console.log(req.body.name);
    res.send(validator.isNumeric(req.body.name));
});

module.exports = router;