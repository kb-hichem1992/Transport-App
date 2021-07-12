var mq=require('../index.js');



function GetCondidatById(idi,callback)
{

 
 
 
  mq.query("SELECT * FROM transport.candidat where NUM_INS = ?",idi,(err, result) => {
    
    if (err) throw err;

   
   return callback(result); 
   



  });
 

}




function GetDiplomeData(NumIns,NumForm,NumPerm,DateIns,NumAGR,callback)
{


mq.query( `SELECT NOM_CANDIDAT,PRENOM_CANDIDAT,DATE_NAIS_CANDIDAT,LIEU_NAIS_CANDIDAT,ADRESSE_CANDIDAT,TYPE_FORMATION,LIV_BREVET,EXP_BREVET
 FROM candidat,passe,formation WHERE passe.NUM_INS=? and passe.NUMERO_FORMATION=? and passe.NUM_PERMIS=? and passe.DATE_INS=?
 AND passe.NUMERO_AGREMENT=? AND passe.DATE_INS=candidat.DATE_INS
 AND passe.NUM_INS=candidat.NUM_INS AND passe.NUM_PERMIS=candidat.NUM_PERMIS AND passe.NUMERO_FORMATION=formation.NUMERO_FORMATION `,[NumIns,NumForm,NumPerm,DateIns,NumAGR],
 (err, result) => {
    
    if (err) throw err;

   
   return callback(result); 
   



  });


}



function GetEvaluationData(NumIns,NumForm,NumPerm,DateIns,NumAGR,callback)
{


mq.query( `SELECT NOM_CANDIDAT,PRENOM_CANDIDAT,DATE_NAIS_CANDIDAT,LIEU_NAIS_CANDIDAT,ADRESSE_CANDIDAT,passe.DATE_INS,passe.NUM_INS
 FROM candidat,passe,formation WHERE passe.NUM_INS=? and passe.NUMERO_FORMATION=? and passe.NUM_PERMIS=? and passe.DATE_INS=?
 AND passe.NUMERO_AGREMENT=? AND passe.DATE_INS=candidat.DATE_INS
 AND passe.NUM_INS=candidat.NUM_INS AND passe.NUM_PERMIS=candidat.NUM_PERMIS AND passe.NUMERO_FORMATION=formation.NUMERO_FORMATION `,[NumIns,NumForm,NumPerm,DateIns,NumAGR],
 (err, result) => {
    
    if (err) throw err;

   
   return callback(result); 
   



  });


}
















module.exports = {GetDiplomeData:GetDiplomeData,GetEvaluationData:GetEvaluationData};