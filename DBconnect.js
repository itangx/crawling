var pg = require('pg');

var connectionString = 'postgres://postgres:password@localhost/Chatbot';
var queryResult = "" ;

exports.insert = function (question,answer){
  pg.connect(connectionString, DBinsert);
  function DBinsert(err, client, done){
    
    if (err) {
      console.error(err);
      process.exit(1);
    } 

    var query = 'insert into faqcrawling(question,answer) values (\''+question+'\',\''+answer+'\')' ;
    client.query(query, function (err, result) {
      if (err) throw err;
      client.end(function (err) {
        if (err) throw err;
      });
    });
  }  
  
}

exports.select = function (){
  pg.connect(connectionString, DBselect);
}