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
  password: "hamza",
  database: "hopital",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database is Connected!");
});

router.get("/allPatient", (req, res) => {
  var sql = "select * from patient";
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/patient/:id", (req, res) => {
  var sql = `select * from patient where id= ${req.params.id};`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/patient", (req, res) => {
  //   const obj ={

  //       nom:"hamza",
  //       prenom:"hamza",
  //       dateNaiss:"2002-25-01 01:12:45",
  //       email:"sabii@jdj.com",
  //       adresse:"04",
  //       tele:"05050505",
  //       sexe:"male",
  //       nationalite:"maroc"
  //   }
  const data = req.body;
  data.id = uuidv4();

  console.log(data);
  var sql = `INSERT INTO patient (id, nom, prenom, dateDeNaiss, sexe, adresse, tele, nationalite, cin, email) VALUES
   ('${data.id}', '${data.nom}', '${data.prenom}', '${data.dateDeNaiss}', '${data.sexe}', '${data.adresse}', '${data.tele}', '${data.nationalite}','${data.cin}', '${data.email}')`;

  con.query(sql, function (err, result) {
    if (err) {
      res.send(err);
    } else res.send(data);
  });
});

module.exports = router;
