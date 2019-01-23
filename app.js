/**
 Copyright(c) 2009-2019 by GGoons.
*/

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler')
const methodOverride = require('method-override')
const cors = require('cors')

const app = express();
const connection  = require('express-myconnection'); 
const mysql = require('mysql');

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'FIXME: your-username-here',
        password : 'FIXME: your-password-here',
        port: 3306, //port mysql
        database: 'classicmodels',
        connectionLimit: 20,
        waitForConnections: true
    },'pool') //or single
);

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploaded', express.static(path.join(__dirname, 'uploaded')));
app.use(cors());

require('./router')(app);

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler())
}

const server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
