const express = require('express');
const app = express();
var mysql = require('mysql');
var resultat;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hackeddetected",
    database: "hopital"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Database is Connected!");
});




app.get('/', (req,res)=> { 
    con.query("select * from user", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        resultat = result;
      });
    res.send(resultat);
})




app.listen(4000,()=>{
    console.log("server is running successfully on port 4000 !");
})