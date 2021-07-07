var mq=require('../index.js');



function GetCondidatById(idi,callback)
{

 
 
 
  mq.query("SELECT * FROM transport.candidat where NUM_INS = ?",idi,(err, result) => {
    
    if (err) throw err;

   
   return callback(result); 
   



  });
 

}

function GetDiplomeData(NumIns,NumForm,callback)
{


mq.query( `SELECT NOM_CANDIDAT,PRENOM_CANDIDAT,DATE_NAIS_CANDIDAT,LIEU_NAIS_CANDIDAT,ADRESSE_CANDIDAT,TYPE_FORMATION,DATE_LIVRAI,DATE_EXP
 FROM candidat,passe,formation,permis_circuler WHERE passe.NUM_INS=? and passe.NUMERO_FORMATION=? 
 AND passe.NUM_INS=candidat.NUM_INS AND passe.NUMERO_FORMATION=formation.NUMERO_FORMATION AND candidat.NUMERO_OPERATEUR=permis_circuler.NUMERO_OPERATEUR  `,[NumIns,NumForm],
 (err, result) => {
    
    if (err) throw err;

   
   return callback(result); 
   



  });


}









module.exports = {GetDiplomeData:GetDiplomeData};