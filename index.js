const express = require("express");
const app = express();

var patient = require("./routes/patient");
app.use("/api", patient);

app.listen(3001, () => {
  console.log("server is running successfully on port 4000 !");
});
