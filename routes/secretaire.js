var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var moment = require("moment");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const { v4: uuidv4 } = require("uuid");

//console.log(uuidv4());

var mysql = require("mysql");
var resultat;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hamza",
  database: "hopital",
});

router.get("/allSecretaires", (req, res) => {
  var sql = "select * from user where role='secretaire'";
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.post("/user", (req, res) => {
  const data = req.body;

  const id = uuidv4();
  const idP = uuidv4();

  var sql = `INSERT INTO user (id,username,password, nom, prenom, dateDeNaiss, sexe, adresse, tele,cin, email,role) VALUES
  ('${id}','${data.username}','${data.password}','${data.nom}','${data.prenom}','${data.dateDeNaiss}','${data.sexe}','${data.adresse}','${data.tele}','${data.cin}','${data.email}','${data.role}');`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});
module.exports = router;
