var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var middleWare = require('./verifyToken');
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

router.get("/allPatients", (req, res) => {
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

router.get("/patient/chercher/:cle", (req, res) => {
  var sql = `select * from patient where 
  concat(nom , ' ' , prenom , ' ' , tele , ' ' , cin , ' ' , email) like '%${req.params.cle}%';`;
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

router.put("/patient/:id", (req, res) => {
  const data = req.body;
  console.log(data);
  var sql = `UPDATE patient SET
    nom='${data.nom}',prenom = '${data.prenom}',dateDeNaiss='${data.dateDeNaiss}',sexe='${data.sexe}',adresse='${data.adresse}',tele='${data.tele}',nationalite='${data.nationalite}',cin='${data.cin}',email='${data.email}'
    WHERE id = '${req.params.id}'`;
  con.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      console.log(err);
    } else res.send(result);
  });
});

router.get("/patient/:idPatient/AllMedecin", (req, res) => {
  var sql = `select nom ,prenom from user u where u.id=(select idMedecin from rendezvous where idPatient = '${req.params.idPatient}') `;
  con.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

router.get("/medecin/:idMedecin/allPatients", (req, res) => {
  var sql = `select nom ,prenom from patient p where p.id=(select idPatient from rendezvous where idMedecin = '${req.params.idMedecin}') ;`;
  con.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

// var sql = `select id from rendezvous where idMedecin = ${req.params.idMedecin}`;

// router.delete("/patient/:id", (req, res) => {
//   var sql = `DELETE FROM patient WHERE id = '${req.params.id}'`;
//   con.query(sql, function (err, result) {
//     if (err) {
//       res.send(err);
//       console.log(err);
//     } else res.send(data);
//   });
// });

router.get("/patient/nbrConsultation/:id", (req, res) => {
  var sql = `select count(*) from rendezVous where idPatient = ${req.params.id} and presence = 1;`;
  con.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      Count = JSON.parse(JSON.stringify(result))[0];
      Count["count"] = Count["count(*)"];
      console.log(Count);
      return res.json({ status: 200, error: null, res_Count: Count });
    }
  });
});

module.exports = router;
