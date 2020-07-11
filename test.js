var fs    = require('fs');
var sloc  = require('sloc');
const ar = [];
 
fs.readFile("code.js", "utf8", function(err, code){
 
  if(err){ console.error(err); }
  else{
    var stats = sloc(code,"js");
    for(i in sloc.keys){
      var k = sloc.keys[i];
      ar.push({"k" : k , "stats" : stats[k]});
      console.log(k + " : " + stats[k]);
     
    }
    console.log(ar);
  }
});