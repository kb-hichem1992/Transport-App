var pdf = require("pdf-creator-node");
// var pdf = require("../index");
var fs = require("fs");
var path = require("path");
// Read HTML Template
var html = fs.readFileSync(path.join(__dirname, "./template.html"), "utf8");

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
};

var users = [
  {
    name: "mohammed",
    age: "26",
  },
  {
    name: "Vitthal",
    age: "26",
  }
];
var document = {
  html: html,
  data: {
    users: users,
  },
  path: "./output.pdf",
  type: "buffer", // "stream" || "buffer" || "" ("" defaults to pdf)
};

 module.exports.generatepdf = ()=>{
  console.log(users)
    console.log(document);
    pdf.create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    
}


