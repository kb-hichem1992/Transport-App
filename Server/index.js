const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const pdf  =  require("./report/pdfGenerator.js")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
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
    "SELECT passe.NUMERO_FORMATION, candidat.NUMERO_CANDIDAT,candidat.NOM_CANDIDAT, candidat.PRENOM_CANDIDAT, candidat.PRENOM_PERE, formation.TYPE_FORMATION, passe.GROUPE, formation.DEBUT, formation.FIN,passe.REMARQUE, passe.NOTE from ((passe inner join candidat on candidat.NUMERO_CANDIDAT = passe.NUMERO_CANDIDAT) inner join formation on formation.NUMERO_FORMATION = passe.NUMERO_FORMATION) where passe.NUMERO_FORMATION= ?";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get_candidat_form/:numeroFormation", (req, res) => {
  const numeroFormation = req.params.numeroFormation;
  db.query(
    "SELECT passe.NUMERO_FORMATION, candidat.NUMERO_CANDIDAT,candidat.NOM_CANDIDAT, candidat.PRENOM_CANDIDAT, candidat.PRENOM_PERE, formation.TYPE_FORMATION, passe.GROUPE, formation.DEBUT, formation.FIN,passe.REMARQUE, passe.NOTE from ((passe inner join candidat on candidat.NUMERO_CANDIDAT = passe.NUMERO_CANDIDAT) inner join formation on formation.NUMERO_FORMATION = passe.NUMERO_FORMATION) where passe.NUMERO_FORMATION= ?",
    numeroFormation,
    (err, result) => {
      res.send(result);
    }
  );
});
app.put("/update_passe", (req, res) => {
  const remarque = req.body.remarque;
  const note = req.body.note;
  const numeroCandidat = req.body.numeroCandidat;
  const numeroFormation = req.body.numeroFormation;
  const groupe = req.body.groupe;
  const GROUPE = req.body.GROUPE;
  db.query(
    "UPDATE passe SET `REMARQUE`= ?, `NOTE`= ? , `GROUPE` = ? WHERE `NUMERO_CANDIDAT`= ? and `NUMERO_FORMATION`= ? and `GROUPE`= ? ;",
    [remarque, note, groupe, numeroCandidat, numeroFormation, GROUPE],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
      }
    }
  );
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
  const Num_permis = req.body.Num_permis;
  const date_liv = req.body.date_liv;
  const date_exp = req.body.date_exp;
  const categorie_permis = req.body.categorie_permis;
  const type_permis = req.body.type_permis;
  db.query(
    "INSERT INTO candidat (`NUMERO_CANDIDAT`, `NOM_CANDIDAT`, `PRENOM_CANDIDAT`, `DATE_NAIS_CANDIDAT`, `LIEU_NAIS_CANDIDAT`, `NIVEAU_SCOL_CANDIDAT`, `ADRESSE_CANDIDAT`, `PRENOM_PERE`, `SEX_CONDIDAT`, `NUM_PERMIS`, `DATE_LIV_PERMIS`, `DATE_EXP_PERMIS`, `CATEGORIE_PERMIS`, `TYPE_PERMIS`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
      Num_permis,
      date_liv,
      date_exp,
      categorie_permis,
      type_permis,
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
  const Num_permis = req.body.Num_permis;
  const date_liv = req.body.date_liv;
  const date_exp = req.body.date_exp;
  const categorie_permis = req.body.categorie_permis;
  const type_permis = req.body.type_permis;
  db.query(
    "UPDATE candidat SET `NOM_CANDIDAT`=?, `PRENOM_CANDIDAT`= ?, `DATE_NAIS_CANDIDAT`=? , `LIEU_NAIS_CANDIDAT`= ?, `NIVEAU_SCOL_CANDIDAT`= ?, `ADRESSE_CANDIDAT`= ?, `PRENOM_PERE`= ?, `SEX_CONDIDAT` = ?, `NUM_PERMIS` = ?, `DATE_LIV_PERMIS` = ?, `DATE_EXP_PERMIS` = ?, `CATEGORIE_PERMIS` = ?, `TYPE_PERMIS` = ? WHERE `NUMERO_CANDIDAT`= ? ;",
    [
      Nom,
      Prénom,
      Date_naissance,
      Lieu_naissance,
      Niveau,
      Adresse,
      Prénom_Pére,
      Sexe,
      Num_permis,
      date_liv,
      date_exp,
      categorie_permis,
      type_permis,
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
    [numeroFormation, Type, Debut, Fin],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.put("/update_formation", (req, res) => {
  const Type = req.body.Type;
  const Debut = req.body.Debut;
  const Fin = req.body.Fin;
  const numeroFormation = req.body.numeroFormation;
  db.query(
    "UPDATE formation SET `TYPE_FORMATION`= ?, `DEBUT`= ?, `FIN`= ? WHERE `NUMERO_FORMATION`=?;",
    [Type, Debut, Fin, numeroFormation],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
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

app.get("/report", (req,res) => {
    pdf.generatepdf(); 
}) ;  

app.post("/Add_passe", (req, res) => {
  const numeroCandidat = req.body.numeroCandidat;
  const numeroFormation = req.body.numeroFormation;
  const remarque = req.body.remarque;
  const note = req.body.note;
  const groupe = req.body.groupe;
  db.query(
    "INSERT INTO passe (`NUMERO_CANDIDAT`, `NUMERO_FORMATION`, `GROUPE` , `REMARQUE`, `NOTE` ) VALUES (?,?,?,?,?)",
    [numeroCandidat, numeroFormation, groupe, remarque, note],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.listen(3001, () => {
  console.log("it works");
});
