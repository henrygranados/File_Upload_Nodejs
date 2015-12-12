var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res){
   res.sendfile('./public/html/form-file.html');
});

/* POST file */
router.post('/', function(req , res){
	var multiparty = require('multiparty');
	var form = new multiparty.Form();

	form.parse(req, function(err, fields, files){

      var theFile = files.fileToBeUploaded[0];

      var fs = require('fs');
      fs.readFile(theFile.path , function(err, data){

         // This is the path where the file will be sent to after submission
      	var path = "./public/allfiles/" + theFile.originalFilename;

      	fs.writeFile(path , data , function(error){
      		if(error) {
               console.log("An error has occurred");

            }else{
      		res.send("Successfully Uploaded!");
         }
      	});

      });

	});
});

module.exports = router;
