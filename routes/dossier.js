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

router.post("/patientDossier", (req, res) => {
  var idDossier = uuidv4();
  var sql = `insert into dossier_patient (id,chemin_dossier,patientId) values ('${idDossier}',"thing",'${req.body.id}');`;
  con.query(sql, function (err, result) {
    if (err) {
      res.send(err);
    } else res.send(result);
  });
});

router.post("/ord", (req, res) => {
  const data = req.body;
  console.log(data.id);
  var sql = `insert into ordonance (id,titre,date,observation,dossierPatientId) values ('${data.id}','${data.titre}',"2002-01-01 01:12:45",'${data.observation}','${data.idDossier}');`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.post("/con", (req, res) => {
  const data = req.body;
  var sql = `insert into consultation (id,date,observation,poids,dossierPatientId) values ('${data.id}',"2002-01-01 01:12:45",'${data.observation}',5,'${data.idDossier}');`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
  // insertion consultation
});
router.post("/ana", (req, res) => {
  const data = req.body;
  var sql = `insert into analysesradiologiques (id,type,typeA,typeR,titre,observation,dossierPatientId) values ('${data.id}','${data.date}','${data.typeA}','${data.typeR}','${data.titre}','${data.observation}','${data.idDossier}');`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });

  // insertion consultation
});
router.get("/dossier/:idPatient", (req, res) => {
  var sql = `select * from dossier_Patient where patientId='${req.params.idPatient}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/analyses", (req, res) => {
  var sql = `select * from analyses`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/con/:id", (req, res) => {
  var sql = `select * from consultation where id ='${req.params.id}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});
router.get("/ord/:id", (req, res) => {
  var sql = `select * from ordonance where id ='${req.params.id}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});
router.get("/ana/:id", (req, res) => {
  var sql = `select * from analysesradiologiques where id ='${req.params.id}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.put("/con/:id", (req, res) => {
  const data = req.body;

  var sql = `UPDATE consultation SET
  observation='${data.observation}',dossierPatientId='${data.idDossier}'
  WHERE id = '${req.params.id}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.put("/ord/:id", (req, res) => {
  var data = req.body;
  console.log(data);
  var sql = `UPDATE ordonance SET
    titre= '${data.titre}',observation='${data.observation}',dossierPatientId='${data.idDossier}'
    WHERE id = '${req.params.id}';`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});
router.put("/ana/:id", (req, res) => {
  var data = req.body;
  console.log(data);
  var sql = `UPDATE analysesradiologiques SET
  typeA= '${data.typeA}',typeR='${data.typeR}',titre='${data.titre}',observation='${data.observation}',dossierPatientId = '${data.idDossier}'
  WHERE id = '${req.params.id}';`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

module.exports = router;
