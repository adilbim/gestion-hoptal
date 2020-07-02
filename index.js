const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

////////////////
var patient = require("./routes/patient");
var rendezVous = require("./routes/rendezVous");
var medecin = require("./routes/medecin");
var planning = require("./routes/planning");
var listAttente = require("./routes/listeAttente");
var dossier = require("./routes/dossier");
app.use("/api", patient);
app.use("/api", rendezVous);
app.use("/api", medecin);
app.use("/api", planning);
app.use("/api", listAttente);
app.use("/api", dossier);
//////////////////

const server = http.createServer(app);
const io = socketIo(server);
app.get("/", (req, res) => {
  res.send({ the_why: "this route is only for the sockets!" });
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("ListeAttente_presence", (data) => {
    console.log(data);
    socket.broadcast.emit("patientPresent", data);
  });
  socket.on("ListeAttente_presence2", (data) => {
    console.log(data);
    socket.broadcast.emit("patient!Present", data);
  });
  socket.on("RendezVous", (data) => {
    console.log(data);
    socket.broadcast.emit("rendezVous1", data);
  });
  socket.on("RendezVousDelete", (data) => {
    console.log(data);
    socket.broadcast.emit("rendezVous2", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3001, () => {
  console.log("server is running successfully on port 3001 !");
});
