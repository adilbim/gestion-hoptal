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

router.get('/planning/:idUser',(req,res) => {
    let sql = `select id, dateDebut startDate, dateFin endDate, description title from planning where idUser = ${req.params.idUser};`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        else {
          res.send(result);
        }
      });
})

router.post('/planning',(req,res) => {
    let data = req.body;
    console.log(data);
    data.id = uuidv4();
    let sql = `insert into planning(id,dateDebut,dateFin,description,idUser) values('${data.id}','${data.startDate}','${data.endDate}','${data.title}','${data.idUser}');`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        else {
          res.send(result);
        }
      });
})


module.exports = router;