// Import Dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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

// Dummy query to test connection
db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });