const express = require("express"); 
const app = express(); 
const morgan = require('morgan');
const port = 4000;
const mysql = require("mysql"); 
const {host, password, user, database} = require("./secrets"); 

const mysqlConnection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
})

mysqlConnection.connect(err => {
    if(!err) console.log("DB CONNECTED")
    else {
        console.log(
            'db not connected' + JSON.stringify(err, undefined, 2)
        )
    }
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("server started"); 
})

app.get("/api/skills", function(req, res){
    mysqlConnection.query('SELECT * FROM skills', (err, rows, field) => {
        if(!err) res.send(rows); 
        else console.log(err); 
    }); 
})

app.get("/api/jobs", function(req, res){
    mysqlConnection.query('SELECT * FROM jobs', (err, rows, field) => {
        if(!err) res.send(rows); 
        else console.log(err); 
    }); 
})

app.get("/api/matched", function(req, res){
    mysqlConnection.query('SELECT * FROM matched', (err, rows, field) => {
        if(!err) res.send(rows); 
        else console.log(err); 
    }); 
})


app.get('/api/results/:skillname', function(req, res){
    mysqlConnection.query(
        'SELECT matched.skill_id, skill_name, matched.jobs_id,\
         jobs_name FROM skills INNER JOIN matched ON \
         skills.skill_id = matched.skill_id INNER JOIN jobs \
         ON jobs.jobs_id = matched.jobs_id WHERE skill_name=?', 
        [req.params.skillname],  
        (err, rows, field) => {
            if(!err) {
                res.send(rows); 
            } else {
                console.log(err)
            }
        })
} )

