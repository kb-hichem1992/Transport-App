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








async function GenerationFich1(idin,idform,uurl) {

 
  data.GetDiplomeData(idin,idform,async function(result){
	   
	   
 
  var FICH1={"DIRECTION":{"text":"الشلف","x":275,"y":510},
            "SERIE":{"text":"","x":45,"y":510},
			"DIRECTION2":{"text":"الشلف","x":265,"y":241},
			"PERSONNE":{"text":result[0].NOM_CANDIDAT+" "+result[0].PRENOM_CANDIDAT,"x":246,"y":222},
			"DATE_NAI":{"text":result[0].DATE_NAIS_CANDIDAT,"x":240,"y":205},
			"LIEU_NAI":{"text":result[0].LIEU_NAIS_CANDIDAT,"x":198,"y":205},
			"ADRESSE":{"text":result[0].ADRESSE_CANDIDAT+"fefedffffffffffff","x":180,"y":186},
			"TYPE":{"text":result[0].TYPE_FORMATION,"x":205,"y":164},
			"DE":{"text":result[0].DATE_LIVRAI,"x":112,"y":164},
			"TO":{"text":result[0].DATE_EXP,"x":40,"y":164},
            "LIEU_EDIT":{"text":"الشلف","x":180,"y":124},  
            "DATE_EDIT":{"text":"","x":70,"y":124},
           };

     
	  
  const url =uurl+'/vierge.pdf';
 
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
     
	        var textSize = 10
            
			 if(ob=="DE" || ob=="TO" || ob=="TYPE")
				 textSize=8;
			 
			 if(ob=="TYPE" && F1[ob]["text"].length>19)
				  textSize=6;
			    
			 
			 var textHeight = helveticaFont.heightAtSize(textSize)
            
			
			
      var textWidth = helveticaFont.widthOfTextAtSize(F1[ob]["text"], textSize)
     
	  /*
      firstPage.drawRectangle({
        x: F1[ob]["x"],
        y: F1[ob]["y"],
        width: textWidth,
        height: 5,
        borderColor: rgb(1, 1, 1),
        borderWidth:  textHeight,
     
      })
     */
  

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
  

  });
 

}




 module.exports.generatepdf = (idin,idform,uurl)=>{
 

 GenerationFich1(idin,idform,uurl).catch(err => console.log(err));

}


