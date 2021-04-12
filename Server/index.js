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
    "select operateur.NOM_OPERATEUR, operateur.PRENOM_OPERATEUR, operateur.PRENOM_PERE,operateur.DATE_NAIS_OPERATEUR, operateur.LIEU_NAIS_OPERATEUR from operateur where TYPE_OPERATEUR = 'physique';";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_form", (req, res) => {
  const sqlquery =
    "select formation.NUMERO_FORMATION, formation.TYPE_FORMATION, formation.DEBUT, formation.FIN from formation;";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_candidat", (req, res) => {
  const sqlquery = "SELECT * FROM transport.candidat;";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_candidat_form", (req, res) => {
  const sqlquery =
    "SELECT candidat.NOM_CANDIDAT, candidat.PRENOM_CANDIDAT, candidat.PRENOM_PERE, formation.TYPE_FORMATION, formation.DEBUT, formation.FIN,passe.REMARQUE from ((passe inner join candidat on candidat.NUMERO_CANDIDAT = passe.NUMERO_CANDIDAT) inner join formation on formation.NUMERO_FORMATION = passe.NUMERO_FORMATION);";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_veh_Mar", (req, res) => {
  const sqlquery =
    "select vehicule.IMMATRECULATION, vehicule.MARQUE, vehicule.PTC, vehicule.PTAC, vehicule.CU  , operateur.NOM_OPERATEUR, operateur.PRENOM_OPERATEUR, operateur.PRENOM_PERE  from vehicule, operateur where vehicule.GENRE = 'Marchandise' and vehicule.NUMERO_OPERATEUR = operateur.NUMERO_OPERATEUR;";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_veh_voyag", (req, res) => {
  const sqlquery =
    "select vehicule.IMMATRECULATION, vehicule.MARQUE,vehicule.NOMBRE_PLACE, operateur.NOM_OPERATEUR, operateur.PRENOM_OPERATEUR, operateur.PRENOM_PERE  from vehicule, operateur where vehicule.GENRE = 'Voyageur' and vehicule.NUMERO_OPERATEUR = operateur.NUMERO_OPERATEUR;";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_Lot_TUN", (req, res) => {
  const sqlquery =
    "SELECT doc.Date_doc, doc.Date_seq, doc.Ref_MO, doc.Titre, doc.code FROM test.doc where Lot = 'TUN';";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});
app.get("/api/get_Lot_EE", (req, res) => {
  const sqlquery =
    "SELECT doc.Date_doc, doc.Date_seq, doc.Ref_MO, doc.Titre, doc.code FROM test.doc where Lot like'EE%';";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});

app.post("/Add_condidat", (req, res) => {
  const numeroCandidat = req.body.numeroCandidat;
  const Nom = req.body.Nom;
  const Prénom = req.body.Prénom;
  const Date_naissance = req.body.Date_naissance;
  const Lieu_naissance = req.body.Lieu_naissance;
  const Niveau = req.body.Niveau;
  const Adresse = req.body.Adresse;
  const Prénom_Pére = req.body.Prénom_Pére;
  const Sexe = req.body.Sexe;

  db.query(
    "INSERT INTO candidat (`NUMERO_CANDIDAT`, `NOM_CANDIDAT`, `PRENOM_CANDIDAT`, `DATE_NAIS_CANDIDAT`, `LIEU_NAIS_CANDIDAT`, `NIVEAU_SCOL_CANDIDAT`, `ADRESSE_CANDIDAT`, `PRENOM_PERE`, `SEX_CONDIDAT`) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      numeroCandidat,
      Nom,
      Prénom,
      Date_naissance,
      Lieu_naissance,
      Niveau,
      Adresse,
      Prénom_Pére,
      Sexe,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update_candidat", (req, res) => {
  const numeroCandidat = req.body.numeroCandidat;
  const Nom = req.body.Nom;
  const Prénom = req.body.Prénom;
  const Date_naissance = req.body.Date_naissance;
  const Lieu_naissance = req.body.Lieu_naissance;
  const Niveau = req.body.Niveau;
  const Adresse = req.body.Adresse;
  const Prénom_Pére = req.body.Prénom_Pére;
  const Sexe = req.body.Sexe;
  db.query(
    "UPDATE candidat SET `NOM_CANDIDAT`=?, `PRENOM_CANDIDAT`= ?, `DATE_NAIS_CANDIDAT`=? , `LIEU_NAIS_CANDIDAT`= ?, `NIVEAU_SCOL_CANDIDAT`= ?, `ADRESSE_CANDIDAT`= ?, `PRENOM_PERE`= ?, `SEX_CONDIDAT` = ? WHERE `NUMERO_CANDIDAT`= ? ;",
    [
      Nom,
      Prénom,
      Date_naissance,
      Lieu_naissance,
      Niveau,
      Adresse,
      Prénom_Pére,
      Sexe,
      numeroCandidat,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_candidat/:numeroCandidat", (req, res) => {
  const numeroCandidat = req.params.numeroCandidat;
  db.query(
    "delete from candidat where NUMERO_CANDIDAT = ?",
    numeroCandidat,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/Add_formation", (req, res) => {
  const numeroFormation = req.body.numeroFormation;
  const Type = req.body.Type;
  const Debut = req.body.Debut;
  const Fin = req.body.Fin;
  db.query(
    "INSERT INTO formation (`NUMERO_FORMATION`, `TYPE_FORMATION`, `DEBUT`, `FIN`) VALUES (?,?,?,?)",
    [
      numeroFormation,
      Type,
      Debut,
      Fin,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.delete("/delete_formation/:numeroFormation", (req, res) => {
  const numeroFormation = req.params.numeroFormation;
  db.query(
    "delete from formation where NUMERO_FORMATION = ?",
    numeroFormation,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.listen(3001, () => {
  console.log("it works");
});
