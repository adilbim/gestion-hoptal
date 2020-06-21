var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const { v4: uuidv4 } = require("uuid");

console.log(uuidv4());

var mysql = require("mysql");
var resultat;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hackeddetected",
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
    con.query(sql, (err, result) => {
      if (err) throw err;
      else res.send(result);
    });
  });





module.exports = router;