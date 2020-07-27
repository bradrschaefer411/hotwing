//define our dependencies
var express = require("express");
var path = require('path');
var fs = require('fs');
var ejs =require('ejs');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var creds = require('./config/orm.js')

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port.
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sets bodyparser to handle incoming form data
app.use(bodyparser.urlencoded({
   extended: true
 }));

//sets the render engine to use EJS
 app.engine('html', require('ejs').renderFile);
 app.set('view engine', 'ejs');

//includes the public folder of our app
 app.use(express.static(path.join(__dirname,'/public')));

 let connection;
 if (process.env.JAWSDB_URL) {
   connection = mysql.createConnection(process.env.JAWSDB_URL);
 } else {
   connection = mysql.createPool({
    connectionLimit: 20,
    host: creds.database.host,
    port: creds.database.port,
    user: creds.database.username,
    password: creds.database.password,
    database: creds.database.database,
 
  });
 }

//  var connection =  mysql.createPool({
//    connectionLimit: 20,
//    host: creds.database.host,
//    port: creds.database.port,
//    user: creds.database.username,
//    password: creds.database.password,
//    database: creds.database.database,

//  });

//Define the routes


//index route: this is the route to handle the main landing page. this defines what will happen when the user first requests your url.
app.get('/', function(request, response){
  // console. confirmation that the request was made to view the index.html page.
  console.log('a request was made on the index page..... so that means a user wants to see it.');
  //sending them the home.html page in response to the user requesting our page.
  response.render('index');
});

app.get('/info', function(request, response){
  // console. confirmation that the request was made to view the index.html page.
  console.log('a request was made on the info page..... so that means a user wants to see it.');
  //sending them the home.html page in response to the user requesting our page.

  response.render('info');
});


app.get('/survey', function(request, response){
  //console confirmation to see the user requested our survey page.
  console.log('user wants to see the survey page ... so a request was made on /survey.');
  //sending the  actual survey via survey.ejs

  //init the connection.
  response.render('survey',{
    fname: request.query.fname,
    lname: request.query.lname,
    email: request.query.email
  });
});

app.post('/surveyresponse', function(req,res){
  console.log('user hit the submit button on the survey. we will now send them the json data.');

// declare the body parser stuff as easy to remember variable  names

  var q1 = parseInt(req.body.question1);
  var q2 = parseInt(req.body.question2);
  var q3 = parseInt(req.body.question3);
  var q4 = parseInt(req.body.question4);
  var q5 = parseInt(req.body.question5);

var score =  q1 + q2 + q3 + q4 + q5 ;






// create a connection to the database so  i can update the table
connection.getConnection(function(err){
  if(err) throw err;
  console.log('connected on surveyresults route');
 var sql = "SELECT * from wings;";
  console.log(sql);
  connection.query(sql, function(err, result){
    if (err) throw err
    console.log('updated the event route vars to the DB successfully.');
    console.log(score);
    function pair(result, score){
      if(score == 0){
        console.log("your sauce is: " + result[1].sauce)
        return(result[0].sauce)
      }else if(score == 1 ){
        console.log("your sauce is: " + result[6].sauce)
        return(result[6].sauce)
      }else if(score == 2){
        console.log("your sauce is: " + result[6].sauce)
        return(result[6].sauce)
      }else if(score == 3 ){
        console.log("your sauce is: " + result[6].sauce)
        return(result[6].sauce)
      }else if(score == 4 ){
        console.log("your sauce is: " + result[4].sauce)
        return(result[4].sauce)
      }else if(score == 5 ){
        console.log("your sauce is: " + result[2].sauce)
        return(result[2].sauce)
      }else if(score == 6 ){
        console.log("your sauce is: " + result[3].sauce)
        return(result[3].sauce)
      }else if(score == 7 ){
        console.log("your sauce is: " + result[3].sauce)
        return(result[2].sauce)
      }
    }
    pair(result,score);
    res.render('resultspage',{
      sauce: pair(result,score)
    })
    // res.json(result)
  });
   });


});






app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
