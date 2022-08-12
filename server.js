// Import Dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Import the sql commander class and set up new object to produce sql query strings
const Sqlcmdr = require('./lib/sqlcmdr');
const queries = new Sqlcmdr;

// Set the port
const PORT = process.env.PORT || 3001;
// Set up the express app
const app = express();

// Connect with the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Pn7LHHbp!',
      database: 'employee_tracker_db'
    },
);

// Dummy queries to test sqlcmdr
db.query(queries.getDepts(), function (err, results) {
    console.log(results);
});
db.query(queries.getRoles(), function (err, results) {
    console.log(results);
});
db.query(queries.getEmps(), function (err, results) {
    console.log(results);
});
db.query(queries.addDept("Test Department 2"), function (err, results) {
    console.log(results);
});
db.query(queries.addRole("Test Role", 1234, 1), function (err, results) {
    console.log(results);
});
db.query(queries.addEmp("Test fName", "Test lName", 1, 1), function (err, results) {
    console.log(results);
});
db.query(queries.updateEmpRole(1, 2), function (err, results) {
    console.log(results);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });