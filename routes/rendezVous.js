var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

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

router.get("/RendezVous", (req, res) => {
  var sql = "select * from rendezVous";
  con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

router.get("/rendezVous/patient/:idPatient", (req, res) => {
    var sql = `select * from rendezVous where idPatient = ${req.params.idPatient};`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      else {
        res.send(result);
      }
    });
  });
  
router.get("/rendezVous/medecin/:idMedecin", (req,res)=> {
   var sql = `select id, service title, date startDate from rendezvous where idMedecin = ${req.params.idMedecin}`;
   con.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
})  

router.post("/RendezVous", (req, res) => {
    //  {
    //     dateR: '2020-05-25 12:45:55',
    //     service: 'consultation',
    //     presence: false,
     //     prix: 255.0
    //     date: '2020-05-25 12:45:55',
    //     cheminDeBilan: 'fill it later',
    //     idPatient: '1401',
    //     idMedecin: '1102'
    // }
    var data = req.body;
    data.id = uuidv4();
    console.log(data);
    var sql = `INSERT INTO rendezVous 
    (id, dateR, service, presence, prix, date, cheminDeBilan, idMedecin, idPatient) VALUES 
    ('${data.id}', '${data.dateR}', '${data.service}', ${data.presence}, ${data.prix}, '${data.date}' , '${data.cheminDeBilan}', '${data.idMedecin}', '${data.idPatient}');`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      else {
        res.send(result);
      }
    });
});  




router.put("/rendezVous", (req,res)=> {
  let data = req.body;
  let sql = `update rendezVous set service = '${data.title}', date = '${data.date}'   where id = '${data.id}';`;
  con.query(sql, (err, result) => {
   if (err) throw err;
   else {
     res.send(result);
   }
 });
})  





module.exports = router;