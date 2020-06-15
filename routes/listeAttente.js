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
  password: "hackeddetected",
  database: "hopital",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database is Connected!");
});

router.get("/listAttente", (req, res) => {
  var sql = `select r.id id, r.date date, p.nom nom, p.prenom prenom, p.cin cin from rendezVous r, patient p where r.idPatient = p.id and r.idMedecin = '1102';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});




module.exports = router;