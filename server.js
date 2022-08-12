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
function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'selection',
                choices: [
                    'View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add a department', 
                    'Add a role', 
                    'Add an employee', 
                    'Update an employee role', 
                    'Exit'
                ],
            },
        ])
        .then((data) => {
            console.log(data.selection);
            return;
        });
}

// Start listening on localhost port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    menu();
  });