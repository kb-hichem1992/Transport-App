var pdf = require("pdf-creator-node");

var fs = require("fs");
var path = require("path");

const fetch = require("node-fetch");

const fontkit=require('@pdf-lib/fontkit');
const utf8 =require('utf8');


const PD=require('pdf-lib');
const PDFDocument=PD.PDFDocument;

const StandardFonts=PD.StandardFonts;
const rgb=PD.rgb;
const degrees=PD.degrees;


const data=require('./data.js');



/*
async function run() {
  // Create a new document and add a new page
  const doc = await PDFDocument.create();
  const page = doc.addPage();

  page.drawText('You can create PDFs!')



  // Write the PDF to a file
  fs.writeFileSync('./test.pdf', await doc.save());
}
*/








async function GenerationFich1(idi,uurl) {

 
  data.GetCondidatById(idi,async function(result){
	   
	   
 
  var FICH1={"DIRECTION":{"text":"الشلف","x":550,"y":1020},
            "SERIE":{"text":"45656","x":90,"y":1020},
			"DIRECTION2":{"text":"الشلف","x":534,"y":482},
			"PERSONNE":{"text":result[0].NOM_CANDIDAT+" "+result[0].PRENOM_CANDIDAT,"x":542,"y":445},
			"DATE_NAI":{"text":result[0].DATE_NAIS_CANDIDAT,"x":500,"y":410},
			"LIEU_NAI":{"text":result[0].LIEU_NAIS_CANDIDAT,"x":430,"y":410},
			"ADRESSE":{"text":result[0].ADRESSE_CANDIDAT,"x":445,"y":375},
			"TYPE":{"text":"بضائع","x":445,"y":331},
			"DE":{"text":"َ19-12-2020","x":225,"y":331},
			"TO":{"text":"19-12-2022","x":80,"y":331},
            "LIEU_EDIT":{"text":"الشلف","x":370,"y":248},  
            "DATE_EDIT":{"text":"15-12-2020","x":150,"y":252},
           };

     
		   
  const url =uurl+'/DiplomeA3.pdf';
 
 const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  
 
 
   const ubuntuFontBytes = await fetch(
    uurl+'/Cairo-Regular.ttf'
    ).then((res) => res.arrayBuffer());
 
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
  
   pdfDoc.registerFontkit(fontkit); 
   

  const helveticaFont = await pdfDoc.embedFont(ubuntuFontBytes)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()
     
	 
	 

      
	   
	var F1 = JSON.parse(JSON.stringify(FICH1));
	

     
	
	

for (let ob in F1) {
     
	        var textSize = 20
            
			 if(ob=="DE" || ob=="TO")
				 textSize=15;
			 
			 var textHeight = helveticaFont.heightAtSize(textSize)
            
			
			
      var textWidth = helveticaFont.widthOfTextAtSize(F1[ob]["text"], textSize)
       if(ob=="ADRESSE")
		    textWidth=182;
	  
      firstPage.drawRectangle({
        x: F1[ob]["x"],
        y: F1[ob]["y"],
        width: textWidth,
        height: 10,
        borderColor: rgb(1, 1, 1),
        borderWidth:  textHeight,
     
      })
  
  

  firstPage.drawText(F1[ob]["text"],{
    x:F1[ob]["x"],
    y:F1[ob]["y"],
    size: textSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(-360),
	
  })
  
  
  }
  
  
 

  const pdfBytes=await pdfDoc.save();
  fs.writeFileSync('./test4.pdf',pdfBytes);
  
  //download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
	   
	 // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
     
	  
  });
 

}




 module.exports.generatepdf = (ido,uurl)=>{
 

 GenerationFich1(ido,uurl).catch(err => console.log(err));

}


