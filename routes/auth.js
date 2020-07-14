var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const { v4: uuidv4 } = require("uuid");

console.log(uuidv4());

var mysql = require("mysql");
var resultat;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hamza",
  database: "hopital",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database is Connected!");
});

//LOGIN
router.post("/login", (req, res) => {
  let data = req.body;
  let sql = `select * from user where username = '${data.username}' and password = '${data.password}' ;`;
  //var user = [];
  con.query(sql, (err, result) => {
    if (err) throw err;
    else if (result.length == 0)
      return res.send("user name or password is wrong!");
    else {
      let token = jwt.sign(JSON.parse(JSON.stringify(result[0])), "shhhhh");
      //console.log(JSON.parse(result[0]));
      return res.header("auth-token", token).send(token);
    }
  });

  //if (user.length == 0)

  //res.send(user);
});

module.exports = router;
