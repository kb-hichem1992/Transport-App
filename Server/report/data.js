var mq=require('../index.js');



function GetCondidatById(idi,callback)
{

 
 
 
  mq.query("SELECT * FROM transport.candidat where NUM_INS = ?",idi,(err, result) => {
    
    if (err) throw err;

   
   return callback(result); 
   



  });
 

}




module.exports = {GetCondidatById:GetCondidatById};