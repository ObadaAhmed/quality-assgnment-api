var express = require('express');
var router = express.Router();
var fs    = require('fs');
var sloc  = require('sloc');
let ar = [];
const multer = require('multer');
 const sharp = require('sharp');
 const fileFilter = function (req,file, cb) {
  const allowedTypes = ["text/html", "text/css" , "application/json" , "text/javascript" , "text/plain"  , "php"];
          // here
      if (!allowedTypes.includes(file.mimetype)) {
          const error = new Error("wrong file type");
          error.code = "LIMIT_FILE_TYPES";
          return cb(error , false);
      }
  cb(null , true)
};
 const upload = multer({
  dest : './public/uploads/productImages/',
  fileFilter,
  // limits : {
  //     fileSize : MaxSize
  // }
});


/* GET home page. */
router.post('/',upload.single('file') ,function(req, res, next) {
    console.log(req.file);
    console.log(req.file.mimetype);
    let type = '';
    if(req.file.mimetype == 'text/javascript')
      type = "js"
    if(req.file.mimetype == 'text/html')
      type = "html"
    if(req.file.mimetype == 'text/htm')
      type = "html"
    if(req.file.mimetype == 'text/php')
      type = "php"
    if(req.file.mimetype == 'text/javascript')
      type = "js"
    if(req.file.mimetype == 'text/plain')
      type = "txt"
    if(req.file.mimetype == 'text/css')
      type = "css"
    if(req.file.mimetype == 'application/json')
      type = "json"
  
fs.readFile(req.file.path , "utf8", function(err, code){
 
  if(err){ 
    
    console.error(err);
      res.send(err) }
  else{
    var stats = sloc(code,type);
    for(i in sloc.keys){
      var k = sloc.keys[i];
      ar.push({"k" : k , "stats" : stats[k]});
      console.log(k + " : " + stats[k]);
    }
    console.log(ar);
    res.send(ar);
    ar = []
  }
});
});

module.exports = router;
