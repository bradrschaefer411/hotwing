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

 var connection =  mysql.createPool({
   connectionLimit: 20,
   host: creds.database.host,
   port: creds.database.port,
   user: creds.database.username,
   password: creds.database.password,
   database: creds.database.database,

 });

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

  var q1 = req.body.question1;
  var q2 = req.body.question2;
  var q3 = req.body.question3;
  var q4 = req.body.question4;
  var q5 = req.body.question5;
var test = req.query.fname;
console.log( q1 + q2 + q3 + q4 + q5 + test);




// create a connection to the database so  i can update the table
connection.getConnection(function(err){
  if(err) throw err;
  console.log('connected on events route');
  // var sql = "INSERT INTO wings ("+q01 + )"+"';"
  // console.log(sql);
  // connection.query(sql, function(err, result){
  //   if (err) throw err
  //   console.log('updated the event route vars to the DB successfully.');
  //      });
   });

//
//   // construct our json object  structure
//  var formObject = {
//    name: fullname,
//   questions: [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10]
// };
//
// console.log(formObject);
//
// // we are going to use this section on another route to show the world our json response.
//
// var textdb = fs.readFileSync('db.json', 'utf8');
// console.log('read thefile');
// console.log(textdb);
// // var db = require(__dirname + '/db.json');
//
// //send the db.txt file to the api page (route) to show file contents to the world.
// var freshjson = JSON.parse(textdb);
//
// console.log('parsed the file into json' + typeof freshjson)
//
//  freshjson.push(formObject);
// console.log('pushed to the new array');
// console.log(freshjson);
// //using the fs module to save the object we made above into a txt file which will act as a makeshift database.
//
// var restring = JSON.stringify(freshjson);
// //
// fs.writeFile('db.json', restring, function(err){
//   if(err) throw err;
//    console.log('restring was saved to db.json.');
//  });
//  console.log('appended array to json file');
//
//
//  //we are now going to use the data that we got and compare it to each other (the main point of this app)
//
//  // function compare(recently_submitted_data, rest_of_our_json){
//  //   for(var i = 0; i < formObject.questions.length; i++){
//  //
//  //   }
//  // }
//
//

});






app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
