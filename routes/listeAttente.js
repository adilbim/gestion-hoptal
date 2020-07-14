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

con.connect(function (err) {
  if (err) throw err;
  console.log("Database is Connected!");
});

router.get("/listAttente/E/:id", (req, res) => {
  var sql = `select r.id id, r.date date, r.presence, p.nom nom, p.prenom prenom, p.cin cin from rendezVous r, patient p where r.idPatient = p.id and r.idMedecin = '${req.params.id}' and r.presence is false order by date;`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/listAttente/R/:id", (req, res) => {
  var sql = `select r.id id, r.date date, r.presence, p.nom nom, p.prenom prenom, p.cin cin from rendezVous r, patient p where r.idPatient = p.id and r.idMedecin = '${req.params.id}' and r.presence is true order by date;`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.put("/listAttente", (req, res) => {
  let data = req.body;
  sql = `update rendezVous set presence = ${!data.presence}  where id = '${
    data.id
  }';`;
  console.log(sql);
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

module.exports = router;
