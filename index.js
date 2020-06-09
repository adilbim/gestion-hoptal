const express = require("express");
const app = express();

var patient = require("./routes/patient");
var rendezVous = require("./routes/rendezVous");
var medecin = require("./routes/medecin");
app.use("/api", patient);
app.use("/api", rendezVous);
app.use("/api", medecin);



app.listen(3001, () => {
  console.log("server is running successfully on port 3001 !");
});
