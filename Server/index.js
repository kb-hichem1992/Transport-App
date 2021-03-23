const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "transport",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get_op/mor", (req, res) => {
  const sqlquery =
    "select operateur.NOM_OPERATEUR, operateur.PRENOM_OPERATEUR, operateur.PRENOM_PERE,operateur.DATE_NAIS_OPERATEUR, operateur.LIEU_NAIS_OPERATEUR from operateur where TYPE_OPERATEUR = 'morale';";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get_op/phy", (req, res) => {
  const sqlquery =
    "select operateur.NOM_OPERATEUR, operateur.PRENOM_OPERATEUR, operateur.PRENOM_PERE,operateur.DATE_NAIS_OPERATEUR, operateur.LIEU_NAIS_OPERATEUR from operateur where TYPE_OPERATEUR = 'phisique';";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_form", (req, res) => {
  const sqlquery = "select formation.NUMERO_FORMATION, formation.TYPE_FORMATION, formation.DEBUT, formation.FIN from formation;";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get_candidat_form", (req, res) => {
  const sqlquery = "SELECT candidat.NOM_CANDIDAT, candidat.PRENOM_CANDIDAT, candidat.PRENOM_PERE, formation.TYPE_FORMATION, formation.DEBUT, formation.FIN,passe.REMARQUE from ((passe inner join candidat on candidat.NUMERO_CANDIDAT = passe.NUMERO_CANDIDAT) inner join formation on formation.NUMERO_FORMATION = passe.NUMERO_FORMATION);";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_veh_Mar", (req, res) => {
  const sqlquery = "select vehicule.IMMATRECULATION, vehicule.MARQUE, vehicule.PTC, vehicule.PTAC, vehicule.CU  , operateur.NOM_OPERATEUR, operateur.PRENOM_OPERATEUR, operateur.PRENOM_PERE  from vehicule, operateur where vehicule.GENRE = 'Marchandise' and vehicule.NUMERO_OPERATEUR = operateur.NUMERO_OPERATEUR;";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_veh_voyag", (req, res) => {
  const sqlquery = "select vehicule.IMMATRECULATION, vehicule.MARQUE,vehicule.NOMBRE_PLACE, operateur.NOM_OPERATEUR, operateur.PRENOM_OPERATEUR, operateur.PRENOM_PERE  from vehicule, operateur where vehicule.GENRE = 'Voyageur' and vehicule.NUMERO_OPERATEUR = operateur.NUMERO_OPERATEUR;";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_Lot_TUN", (req, res) => {
  const sqlquery = "SELECT doc.Date_doc, doc.Date_seq, doc.Ref_MO, doc.Titre, doc.code FROM test.doc where Lot = 'TUN';";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_Lot_EE", (req, res) => {
  const sqlquery = "SELECT doc.Date_doc, doc.Date_seq, doc.Ref_MO, doc.Titre, doc.code FROM test.doc where Lot like'EE%';";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.listen(3001, () => {
  console.log("it works");
});
