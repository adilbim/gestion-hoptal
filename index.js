const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
var CronJob = require("cron").CronJob;
const nodeMailer = require("nodemailer");
var mysql = require("mysql");
const moment = require("moment");
var resultat;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hamza",
  database: "hopital",
});

////////////////
var patient = require("./routes/patient");
var rendezVous = require("./routes/rendezVous");
var medecin = require("./routes/medecin");
var planning = require("./routes/planning");
var listAttente = require("./routes/listeAttente");
var dossier = require("./routes/dossier");
var secretaire = require("./routes/secretaire");
var auth = require("./routes/auth");
app.use("/api", patient);
app.use("/api", rendezVous);
app.use("/api", medecin);
app.use("/api", planning);
app.use("/api", listAttente);
app.use("/api", auth);
app.use("/api", dossier);
app.use("/api", secretaire);

// var job = new CronJob(
//   "'0 8 * * *'",
//   function () {
//     const nodemailer = require("nodemailer");

//     let mailTransporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "xyz@gmail.com",
//         pass: "*************",
//       },
//     });
//     var today = new Date();
//
// //   var date =
// today.getFullYear() +
// " " +
// (today.getMonth() + 1) +
// " " +
// (today.getDate()-1);
//     var data = [];
//     var sql = "select * from rendezVous ;";
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       else {
//         data = JSON.parse(JSON.stringify(result));
//         data.map((d) => {
//           const dR = moment(d.date).format("YYYY MM DD");
//           if (dR === date) {
//             let patieentGmail = "";
//             var sql1 = `select email from patient where id =${d.idPatient}`;
//             con.query(sql1, (err, result) => {
//               if (err) throw err;
//               else {
//                 patientGmail = JSON.parse(JSON.stringify(result));
//                 console.log(patientGmail[0].email);
//                 let mailDetails = {
//                   from: "xyz@gmail.com",
//                   to: patientGmail[0].email,
//                   subject: "Test mail",
//                   text: "Node.js testing mail for GeeksforGeeks",
//                 };

//                 mailTransporter.sendMail(mailDetails, function (err, data) {
//                   if (err) {
//                     console.log("Error Occurs");
//                   } else {
//                     console.log("Email sent successfully");
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     });
//   },
//   null,
//   true,
//   "America/Los_Angeles"
// );
// job.start();
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
