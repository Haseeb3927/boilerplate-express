var express = require("dotenv").config();
// var bodyParser = require("body-parser");
// var express = require("express");
// var app = express();
// const mySecret = process.env['MONGO_URI']
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URI);

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  next();
  console.log(string);
});

app.get("/", (req, res) => {
  console.log("Hello World");
  absolutePath = __dirname + "/views/index.html";
  // res.send( "Hello Express")
  res.sendFile(absolutePath);
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    console.log(req.time);
    res.send({ time: req.time });
  }
);

app.get("/json", (req, res) => {
  var greeting = { message: "Hello json" };
  const mySecret = process.env["MESSAGE_STYLE"];
  if (mySecret === "uppercase") {
    greeting.message = greeting.message.toUpperCase();
  } else {
    greeting.message = greeting.message;
  }
  res.json(greeting);
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  console.log(word);
  res.json({ echo: word });
});

app.get("/name", (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  console.log(`${firstName} ${lastName}`);
  res.json({ name: `${firstName} ${lastName}` });
});

app.post("/name", (req, res) => {
  let firstName = req.body.first;
  let lastName = req.body.last;
  console.log(`${firstName} ${lastName}`);
  res.json({ name: `${firstName} ${lastName}` });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});

module.exports = app;
